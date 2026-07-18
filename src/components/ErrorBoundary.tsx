import { Component, type ReactNode } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { THEME } from '../theme/constants';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            p: 3,
          }}
        >
          <Paper
            sx={{
              p: 4,
              maxWidth: 500,
              textAlign: 'center',
              border: `2px solid ${THEME.colors.neon}88`,
              backgroundColor: THEME.colors.background,
              borderRadius: THEME.sizes.borderRadius,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: THEME.colors.neon,
                mb: 2,
                fontWeight: 'bold',
              }}
            >
              Oops! Something went wrong
            </Typography>
            <Typography
              sx={{
                color: THEME.colors.textSecondary,
                mb: 3,
              }}
            >
              {this.state.error?.message || 'An unexpected error occurred'}
            </Typography>
            <Button
              variant="outlined"
              onClick={this.handleReset}
              sx={{
                borderColor: THEME.colors.neon,
                color: THEME.colors.neon,
                '&:hover': {
                  backgroundColor: `${THEME.colors.neon}22`,
                  borderColor: THEME.colors.neon,
                },
              }}
            >
              Reload Page
            </Button>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}
