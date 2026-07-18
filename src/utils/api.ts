import { API_CONFIG } from '../theme/constants';

export type NoResponse = {
  reason: string;
};

export class NetworkError extends Error {
  public readonly isOffline: boolean;

  constructor(message: string, isOffline: boolean = false) {
    super(message);
    this.name = 'NetworkError';
    this.isOffline = isOffline;
  }
}

export class TimeoutError extends Error {
  constructor(message: string = 'Request timed out') {
    super(message);
    this.name = 'TimeoutError';
  }
}

/**
 * Check if the browser is currently offline
 */
export function isOffline(): boolean {
  return !navigator.onLine;
}

/**
 * Wait for a specified duration
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Fetch with timeout support
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs: number
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if ((error as Error).name === 'AbortError') {
      throw new TimeoutError();
    }
    throw error;
  }
}

/**
 * Fetch NO response with exponential backoff retry logic
 */
export async function fetchNoWithRetry(
  signal?: AbortSignal
): Promise<NoResponse> {
  if (isOffline()) {
    throw new NetworkError('You are currently offline', true);
  }

  let lastError: Error | null = null;

  for (let attempt = 0; attempt < API_CONFIG.maxRetries; attempt++) {
    try {
      const response = await fetchWithTimeout(
        API_CONFIG.endpoint,
        {
          signal,
          headers: {
            'Accept': 'application/json',
          },
          keepalive: true,
        },
        API_CONFIG.timeout
      );

      if (!response.ok) {
        throw new NetworkError(
          `Server returned ${response.status} ${response.statusText}`
        );
      }

      const json = await response.json();
      return json as NoResponse;
    } catch (error) {
      lastError = error as Error;

      // Don't retry if request was aborted by user
      if ((error as Error).name === 'AbortError') {
        throw error;
      }

      // Don't retry if we're offline
      if (isOffline()) {
        throw new NetworkError('Connection lost', true);
      }

      // Don't retry on the last attempt
      if (attempt === API_CONFIG.maxRetries - 1) {
        break;
      }

      // Exponential backoff: 1s, 2s, 4s, etc.
      const delay = API_CONFIG.initialRetryDelay * Math.pow(2, attempt);
      await sleep(delay);
    }
  }

  // If we get here, all retries failed
  if (lastError instanceof TimeoutError) {
    throw new NetworkError('Request timed out after multiple attempts');
  }

  throw new NetworkError(
    lastError?.message || 'Failed to fetch after multiple attempts'
  );
}
