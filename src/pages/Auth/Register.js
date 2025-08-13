import { useState } from 'react';
import { TextField, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import service from '../../api/service';

export default function Register() {
    const [form, setForm] = useState({ name: '', username: '', password: '', role: 'user' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleRegister = async () => {
        await service.auth.register(form);
        alert('Đăng ký thành công!');
        navigate('/login');
    };

    return (
        <Paper sx={{ p: 3, maxWidth: 400, mx: 'auto' }}>
            <TextField label="Tên" name="name" fullWidth sx={{ mb: 2 }} value={form.name} onChange={handleChange} />
            <TextField label="Tên đăng nhập" name="username" fullWidth sx={{ mb: 2 }} value={form.username} onChange={handleChange} />
            <TextField label="Mật khẩu" name="password" type="password" fullWidth sx={{ mb: 2 }} value={form.password} onChange={handleChange} />
            <Button variant="contained" fullWidth onClick={handleRegister}>Đăng ký</Button>
        </Paper>
    );
}
