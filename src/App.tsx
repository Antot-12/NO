import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import theme from './theme/theme';
import NoFetcher from './components/NoFetcher';

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container
                maxWidth={false}
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: '#0d0d0d'
                }}
            >
                <NoFetcher />
            </Container>
        </ThemeProvider>
    );
}
