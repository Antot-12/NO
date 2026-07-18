import { useEffect, useState, useRef } from 'react';
import { Paper, Button } from '@mui/material';
import { fetchNoWithRetry, type NoResponse, NetworkError } from '../utils/api';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { analytics } from '../utils/analytics';
import { performanceMonitor } from '../utils/performance';
import { THEME } from '../theme/constants';
import { DecorativeGlow } from './DecorativeGlow';
import { Header } from './Header';
import { NoDisplay } from './NoDisplay';
import { ResponseMessage } from './ResponseMessage';
import { Footer } from './Footer';

export default function NoFetcher() {
  const [data, setData] = useState<NoResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<boolean>(true);
  const abortControllerRef = useRef<AbortController | null>(null);
  const isOnline = useOnlineStatus();

  const fetchNo = async () => {
    // Cancel previous request if still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setBusy(true);
    setError(null);

    analytics.track('fetch_requested');

    try {
      const response = await performanceMonitor.measureApiCall(() =>
        fetchNoWithRetry(controller.signal)
      );

      setData(response);
      analytics.track('response_viewed', { reason: response.reason });
    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        return; // Ignore aborted requests
      }

      const errorMessage = err instanceof NetworkError
        ? err.message
        : 'Something went wrong. Please try again.';

      setError(errorMessage);
      analytics.track('fetch_error', {
        error: errorMessage,
        isOffline: err instanceof NetworkError && err.isOffline,
      });
    } finally {
      setBusy(false);
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }
    }
  };

  useEffect(() => {
    fetchNo();

    return () => {
      // Cleanup on unmount
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <Paper
      sx={{
        p: { xs: THEME.spacing.xs, sm: THEME.spacing.sm },
        textAlign: 'center',
        maxWidth: THEME.sizes.maxWidth,
        mx: 'auto',
        border: `${THEME.sizes.borderWidth}px solid ${THEME.colors.neon}88`,
        backgroundColor: THEME.colors.background,
        borderRadius: THEME.sizes.borderRadius,
        boxShadow: `0 0 30px ${THEME.colors.neon}44`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <DecorativeGlow />
      <Header />
      <NoDisplay />
      <ResponseMessage
        busy={busy}
        error={error}
        data={data}
        isOffline={!isOnline}
      />

      <Button
        variant="outlined"
        onClick={fetchNo}
        disabled={busy}
        sx={{
          mt: 2,
          px: 4,
          py: 1.2,
          borderColor: THEME.colors.neon,
          color: THEME.colors.neon,
          fontWeight: 600,
          fontSize: '1rem',
          textTransform: 'none',
          borderRadius: 2,
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: `${THEME.colors.neon}22`,
            borderColor: THEME.colors.neon,
            boxShadow: `0 0 12px ${THEME.colors.neon}`,
          },
          '&:disabled': {
            borderColor: `${THEME.colors.neon}44`,
            color: `${THEME.colors.neon}44`,
          },
        }}
      >
        Ask again
      </Button>

      <Footer />
    </Paper>
  );
}
