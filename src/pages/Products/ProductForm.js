import { useEffect, useState } from 'react';
import { TextField, Button, Paper, Container, Typography, Box, Snackbar, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import service from '../../api/service';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

export default function ProductForm({ mode }) {
    const { id } = useParams();
    const [form, setForm] = useState({ name: '', description: '', price: '', stock: '', image: null });
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate();
    const user = service.auth.getCurrentUser();

    useEffect(() => {
        if (mode === 'edit' && id) {
            service.products.getById(id).then(setForm);
        }
    }, [id, mode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setForm(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        if (mode === 'add' && !form.image) {
            setNotification({ open: true, message: 'Vui lòng thêm ảnh cho sản phẩm!', severity: 'error' });
            return;
        }

        if (mode === 'add') {
            await service.products.create({ ...form, createdBy: user.id, createdAt: new Date().toISOString() });
        } else {
            await service.products.update(id, form);
        }
        navigate('/admin/products');
    };

    return (
        <Container component="main" maxWidth="sm">
            <Paper sx={{ p: 4, mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                    {mode === 'add' ? 'Thêm sản phẩm mới' : 'Chỉnh sửa sản phẩm'}
                </Typography>

                <Box sx={{ my: 2, border: '1px dashed grey', borderRadius: 2, p: 2, minHeight: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {form.image ? (
                        <img src={form.image} alt="Xem trước sản phẩm" style={{ maxHeight: '200px', maxWidth: '100%' }} />
                    ) : (
                        <Typography color="text.secondary">Xem trước ảnh</Typography>
                    )}
                </Box>

                <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    startIcon={<PhotoCamera />}
                    sx={{ mb: 2 }}
                >
                    Tải ảnh lên
                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </Button>

                <TextField label="Tên" name="name" fullWidth sx={{ mb: 2 }} value={form.name} onChange={handleChange} />
                <TextField label="Mô tả" name="description" fullWidth sx={{ mb: 2 }} value={form.description} onChange={handleChange} />
                <TextField label="Giá" name="price" type="number" fullWidth sx={{ mb: 2 }} value={form.price} onChange={handleChange} />
                <TextField label="Số lượng" name="stock" type="number" fullWidth sx={{ mb: 2 }} value={form.stock} onChange={handleChange} />
                <Button variant="contained" onClick={handleSubmit} fullWidth>
                    {mode === 'add' ? 'Thêm' : 'Cập nhật'}
                </Button>
            </Paper>
            <Snackbar open={notification.open} autoHideDuration={6000} onClose={() => setNotification({ ...notification, open: false })}>
                <Alert onClose={() => setNotification({ ...notification, open: false })} severity={notification.severity} sx={{ width: '100%' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}