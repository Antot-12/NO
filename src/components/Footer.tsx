import { Typography } from '@mui/material';
import { THEME } from '../theme/constants';

export function Footer() {
  return (
    <Typography
      sx={{
        mt: 4,
        fontSize: '0.75rem',
        color: THEME.colors.textTertiary,
      }}
    >
      Perfect for polite declines, interview excuses, canceled plans and awkward escapes 😄
    </Typography>
  );
}
