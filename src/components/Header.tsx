import { Typography, Divider } from '@mui/material';
import { THEME } from '../theme/constants';

export function Header() {
  return (
    <>
      <Typography
        variant="h4"
        sx={{
          color: THEME.colors.neon,
          fontWeight: 'bold',
          mb: 1,
          textShadow: `0 0 10px ${THEME.colors.neon}`,
        }}
      >
        NO as a Service
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{
          color: THEME.colors.textSecondary,
          mb: 3,
          fontSize: '0.95rem',
        }}
      >
        A polite and sometimes funny way to say{' '}
        <span style={{ color: THEME.colors.neon }}>"no"</span> — for you
      </Typography>

      <Divider sx={{ borderColor: THEME.colors.neon + '33', mb: 3 }} />
    </>
  );
}
