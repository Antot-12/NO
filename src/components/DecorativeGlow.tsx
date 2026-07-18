import { Box } from '@mui/material';
import { THEME } from '../theme/constants';

export function DecorativeGlow() {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '4px',
        width: '100%',
        background: `linear-gradient(90deg, transparent, ${THEME.colors.neon}, transparent)`,
        animation: `glowmove ${THEME.animations.glowMoveDuration} linear infinite`,
        '@keyframes glowmove': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
      }}
    />
  );
}
