import { useEffect, useState, useCallback } from 'react';
import { Paper, Typography, Button, Box, CircularProgress, Divider } from '@mui/material';

interface NoResponse {
    reason: string;
}

const API = '/api/no';
const neon = '#00ffff';

export default function NoFetcher() {
    const [data, setData] = useState<NoResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [busy, setBusy] = useState<boolean>(true);

    const load = useCallback(async () => {
        setBusy(true);
        setError(null);
        try {
            const r = await fetch(API);
            if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
            const json = await r.json();
            setData(json);
        } catch (e) {
            setError((e as Error).message);
        } finally {
            setBusy(false);
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    return (
        <Paper
            sx={{
                p: { xs: 3, sm: 4 },
                textAlign: 'center',
                maxWidth: 650,
                mx: 'auto',
                border: `2px solid ${neon}88`,
                backgroundColor: '#111',
                borderRadius: 3,
                boxShadow: `0 0 30px ${neon}44`,
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Decorative top glow line */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '4px',
                    width: '100%',
                    background: `linear-gradient(90deg, transparent, ${neon}, transparent)`,
                    animation: 'glowmove 2s linear infinite',
                    '@keyframes glowmove': {
                        '0%': { backgroundPosition: '0% 50%' },
                        '100%': { backgroundPosition: '100% 50%' },
                    },
                }}
            />

            {/* Site title */}
            <Typography
                variant="h4"
                sx={{
                    color: neon,
                    fontWeight: 'bold',
                    mb: 1,
                    textShadow: `0 0 10px ${neon}`,
                }}
            >
                NO as a Service
            </Typography>

            <Typography
                variant="subtitle1"
                sx={{
                    color: '#ccc',
                    mb: 3,
                    fontSize: '0.95rem',
                }}
            >
                A polite and sometimes funny way to say <span style={{ color: neon }}>"no"</span> - for you
            </Typography>

            <Divider sx={{ borderColor: neon + '33', mb: 3 }} />

            {/* Glowing NO */}
            <Typography
                variant="h2"
                sx={{
                    color: neon,
                    fontWeight: 'bold',
                    textShadow: `0 0 16px ${neon}, 0 0 30px ${neon}`,
                    mb: 3,
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                        '0%': { textShadow: `0 0 10px ${neon}` },
                        '50%': { textShadow: `0 0 30px ${neon}` },
                        '100%': { textShadow: `0 0 10px ${neon}` },
                    },
                }}
            >
                NO
            </Typography>

            {/* Response or error */}
            {busy && (
                <Box sx={{ color: neon, my: 4 }}>
                    <CircularProgress size={40} sx={{ color: neon }} />
                </Box>
            )}

            {error && (
                <Typography sx={{ color: neon, mt: 2, fontSize: '1rem' }}>
                    ⚠️ Error: {error}
                </Typography>
            )}

            {data && !busy && !error && (
                <Typography
                    variant="h6"
                    sx={{
                        color: neon,
                        fontSize: '1.3rem',
                        fontWeight: 500,
                        textAlign: 'center',
                        textShadow: `0 0 5px ${neon}`,
                        mb: 3,
                        px: 2,
                        maxWidth: '100%',
                        wordBreak: 'break-word',
                    }}
                >
                    {data.reason}
                </Typography>
            )}

            {/* Button */}
            <Button
                variant="outlined"
                onClick={load}
                sx={{
                    mt: 2,
                    px: 4,
                    py: 1.2,
                    borderColor: neon,
                    color: neon,
                    fontWeight: 600,
                    fontSize: '1rem',
                    textTransform: 'none',
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        backgroundColor: `${neon}22`,
                        borderColor: neon,
                        boxShadow: `0 0 12px ${neon}`,
                    },
                }}
            >
                Ask again
            </Button>

            {/* Footer hint */}
            <Typography
                sx={{
                    mt: 4,
                    fontSize: '0.75rem',
                    color: '#888',
                }}
            >
                Perfect for polite declines, interview excuses, canceled plans and awkward escapes 😄
            </Typography>
        </Paper>
    );
}
