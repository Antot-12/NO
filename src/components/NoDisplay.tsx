import { Typography } from '@mui/material';
import { THEME } from '../theme/constants';

export function NoDisplay() {
  return (
    <Typography
      variant="h2"
      sx={{
        color: THEME.colors.neon,
        fontWeight: 'bold',
        textShadow: `0 0 16px ${THEME.colors.neon}, 0 0 30px ${THEME.colors.neon}`,
        mb: 3,
        animation: `pulse ${THEME.animations.pulseDuration} infinite`,
        '@keyframes pulse': {
          '0%': { textShadow: `0 0 10px ${THEME.colors.neon}` },
          '50%': { textShadow: `0 0 30px ${THEME.colors.neon}` },
          '100%': { textShadow: `0 0 10px ${THEME.colors.neon}` },
        },
      }}
    >
      NO
    </Typography>
  );
}
