import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#0d0d0d',
            paper:   '#131313',
        },
        primary: {
            main: '#00ffff',
        },
        text: {
            primary: '#ffffff',
            secondary: '#00ffff',
        },
    },
    typography: { fontFamily: 'monospace' },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#131313',
                    border: '2px solid #00ffff55',
                    borderRadius: 8,
                },
            },
        },
    },
});

export default theme;
