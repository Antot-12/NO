import { Box, CircularProgress, Typography } from '@mui/material';
import { THEME } from '../theme/constants';

interface ResponseMessageProps {
  busy: boolean;
  error: string | null;
  data: { reason: string } | null;
  isOffline: boolean;
}

export function ResponseMessage({ busy, error, data, isOffline }: ResponseMessageProps) {
  if (busy) {
    return (
      <Box sx={{ color: THEME.colors.neon, my: 4 }}>
        <CircularProgress size={40} sx={{ color: THEME.colors.neon }} />
      </Box>
    );
  }

  if (isOffline) {
    return (
      <Typography sx={{ color: THEME.colors.neon, mt: 2, fontSize: '1rem' }}>
        📡 You're offline. Check your connection.
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography sx={{ color: THEME.colors.neon, mt: 2, fontSize: '1rem' }}>
        ⚠️ {error}
      </Typography>
    );
  }

  if (data) {
    return (
      <Typography
        variant="h6"
        sx={{
          color: THEME.colors.neon,
          fontSize: '1.3rem',
          fontWeight: 500,
          textAlign: 'center',
          textShadow: `0 0 5px ${THEME.colors.neon}`,
          mb: 3,
          px: 2,
          maxWidth: '100%',
          wordBreak: 'break-word',
        }}
      >
        {data.reason}
      </Typography>
    );
  }

  return null;
}
