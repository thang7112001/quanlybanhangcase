import { useState } from 'react';
import { TextField, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import service from '../../api/service';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const user = await service.auth.login(username, password);
        if (user) {
            navigate('/');
        } else {
            alert('Sai tài khoản hoặc mật khẩu');
        }
    };

    return (
        <Paper sx={{ p: 3, maxWidth: 400, mx: 'auto' }}>
            <TextField label="Tên đăng nhập" fullWidth sx={{ mb: 2 }} value={username} onChange={(e) => setUsername(e.target.value)} />
            <TextField label="Mật khẩu" type="password" fullWidth sx={{ mb: 2 }} value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button variant="contained" fullWidth onClick={handleLogin}>Đăng nhập</Button>
        </Paper>
    );
}
