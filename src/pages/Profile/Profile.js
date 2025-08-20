import { useState } from 'react';
import {TextField, Button, Box, Container, Paper, Typography, Avatar, Snackbar, Alert} from '@mui/material';
import service from '../../api/service';
import { setItem } from '../../utils/storage';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

export default function Profile() {
    const user = service.auth.getCurrentUser();
    const [form, setForm] = useState({
        name: user?.name || "",
        password: user?.password || ""
    });
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

    const handleSave = async () => {
        const dataToUpdate = { name: form.name };
        if (form.password) {
            dataToUpdate.password = form.password;
        }

        const updatedUser = { ...user, ...dataToUpdate };
        await service.users.update(user.id, updatedUser);
        setItem("currentUser", updatedUser);
        setNotification({ open: true, message: "Cập nhật thành công!", severity: 'success' });
    };
    if (!user) return null;

    return (
        <Container component="main" maxWidth="xs">
            <Paper sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    {user.name.charAt(0).toUpperCase()}
                </Avatar>
                <Typography component="h1" variant="h5">
                    Thông tin cá nhân
                </Typography>
                <Box sx={{ mt: 3 }}>
                    <TextField
                        fullWidth
                        label="Tên"
                        margin="normal"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        InputProps={{
                            startAdornment: (<Box sx={{ mr: 1 }}><PersonIcon /></Box>),
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Mật khẩu mới (bỏ trống nếu không đổi)"
                        type="password"
                        margin="normal"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        InputProps={{
                            startAdornment: (<Box sx={{ mr: 1 }}><LockIcon /></Box>),
                        }}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3 }}
                        onClick={handleSave}
                    >
                        Lưu thay đổi
                    </Button>
                </Box>
            </Paper>
            <Snackbar open={notification.open} autoHideDuration={6000} onClose={() => setNotification({ ...notification, open: false })}>
                <Alert onClose={() => setNotification({ ...notification, open: false })} severity={notification.severity} sx={{ width: '100%' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}
