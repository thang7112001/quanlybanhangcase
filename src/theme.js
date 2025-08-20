import { createTheme } from '@mui/material/styles';

const palette = {
    prussianBlue: '#002642ff',
    claret: '#840032ff',
    gamboge: '#e59500ff',
    timberwolf: '#e5dadaff',
    richBlack: '#02040fff',
};

const theme = createTheme({
    palette: {
        primary: {
            main: palette.prussianBlue,
        },
        secondary: {
            main: palette.claret,
        },
        warning: {
            main: palette.gamboge,
        },
        background: {
            default: palette.timberwolf,
            paper: '#ffffff',
        },
        text: {
            primary: palette.richBlack,
            secondary: palette.prussianBlue,
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        h4: {
            color: palette.prussianBlue,
            fontWeight: 700,
        },
        h6: {
            color: palette.prussianBlue,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 'bold',
                },
                containedPrimary: {
                    color: '#fff',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                },
            },
        },
    },
});

export default theme;