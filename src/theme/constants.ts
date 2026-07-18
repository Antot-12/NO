export const THEME = {
  colors: {
    neon: '#00ffff',
    background: '#111',
    textSecondary: '#ccc',
    textTertiary: '#888',
  },
  sizes: {
    maxWidth: 650,
    borderRadius: 3,
    borderWidth: 2,
  },
  spacing: {
    xs: 3,
    sm: 4,
  },
  animations: {
    glowMoveDuration: '2s',
    pulseDuration: '2s',
  },
} as const;

export const API_CONFIG = {
  endpoint: 'https://naas.isalman.dev/no',
  timeout: 10000, // 10 seconds
  maxRetries: 3,
  initialRetryDelay: 1000, // 1 second
} as const;
