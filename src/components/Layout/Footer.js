import { Typography, Box } from '@mui/material';

export default function Footer() {
    return (
        <Box sx={{ textAlign: 'center', p: 2, background: '#e5dadaff', mt: 3 }}>
            <Typography variant="body2">
                © 2025 Quản lý bán hàng. All rights reserved.
            </Typography>
        </Box>
    );
}
