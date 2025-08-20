import { useState } from 'react';
import { TextField, Button, Paper, Container, Typography, Box, InputAdornment, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import service from '../../api/service';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';

export default function Register() {
    const [form, setForm] = useState({ name: '', username: '', password: '', role: 'user' });
    const navigate = useNavigate();
    const [notification, setNotification] = useState({ open: false, message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleRegister = async () => {
        try {
            await service.auth.register(form);
            setNotification({ open: true, message: 'Đăng ký thành công! Bạn sẽ được chuyển đến trang đăng nhập.' });
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };


    return (
        <Container component="main" maxWidth="xs">
            <Paper sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Tạo tài khoản
                </Typography>
                <Box component="form" sx={{ mt: 1 }} noValidate>
                    <TextField
                        margin="normal" required fullWidth label="Tên của bạn" name="name"
                        value={form.name} onChange={handleChange}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start"><PersonIcon /></InputAdornment>),
                        }}
                    />
                    <TextField
                        margin="normal" required fullWidth label="Tên đăng nhập" name="username"
                        value={form.username} onChange={handleChange}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start"><AccountCircle /></InputAdornment>),
                        }}
                    />
                    <TextField
                        margin="normal" required fullWidth label="Mật khẩu" name="password" type="password"
                        value={form.password} onChange={handleChange}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start"><LockIcon /></InputAdornment>),
                        }}
                    />
                    <Button
                        type="button" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}
                        onClick={handleRegister}
                    >
                        Đăng ký
                    </Button>
                </Box>
            </Paper>
            <Snackbar open={notification.open} autoHideDuration={6000} onClose={() => setNotification({ ...notification, open: false })}>
                <Alert onClose={() => setNotification({ ...notification, open: false })} severity="success" sx={{ width: '100%' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}
