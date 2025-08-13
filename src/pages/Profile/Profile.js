import { useState, useEffect } from 'react';
import { TextField, Button, Paper } from '@mui/material';
import service from '../../api/service';
import { setItem } from '../../utils/storage';

export default function Profile() {
    const [form, setForm] = useState({});
    const user = service.auth.getCurrentUser();

    useEffect(() => {
        if (user) setForm(user);
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        await service.users.update(user.id, form);
        setItem('currentUser', form);
        alert('Cập nhật thành công!');
    };

    return (
        <Paper sx={{ p: 3, maxWidth: 500, mx: 'auto' }}>
            <TextField label="Tên" name="name" fullWidth sx={{ mb: 2 }} value={form.name || ''} onChange={handleChange} />
            <TextField label="Mật khẩu" name="password" type="password" fullWidth sx={{ mb: 2 }} value={form.password || ''} onChange={handleChange} />
            <Button variant="contained" onClick={handleSave}>Lưu</Button>
        </Paper>
    );
}
