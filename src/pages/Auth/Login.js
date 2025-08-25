import { useState } from 'react';
import { TextField, Button, Paper, Container, Typography, Box, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import service from '../../api/service';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import {useAuth} from "./AuthContext";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const { login } = useAuth();

    const handleLogin = async () => {
        if (!username || !password) {
            alert("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!");
            return;
        }

        const user = await service.auth.login(username, password);
        if (user) {
            login(user);
            navigate("/");
        } else {
            alert("Sai tài khoản hoặc mật khẩu");
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Đăng nhập
                </Typography>
                <Box component="form" sx={{ mt: 1 }} noValidate>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Tên đăng nhập"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Mật khẩu"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleLogin}
                    >
                        Đăng nhập
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}
