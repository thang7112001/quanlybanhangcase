import { useEffect, useState } from 'react';
import { TextField, Button, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import service from '../../api/service';

export default function ProductForm({ mode }) {
    const { id } = useParams();
    const [form, setForm] = useState({ name: '', description: '', price: '', stock: '' });
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

    const handleSubmit = async () => {
        if (mode === 'add') {
            await service.products.create({ ...form, createdBy: user.id, createdAt: new Date().toISOString() });
        } else {
            await service.products.update(id, form);
        }
        navigate('/admin/products');
    };

    return (
        <Paper sx={{ p: 3, maxWidth: 500, mx: 'auto' }}>
            <TextField label="Tên" name="name" fullWidth sx={{ mb: 2 }} value={form.name} onChange={handleChange} />
            <TextField label="Mô tả" name="description" fullWidth sx={{ mb: 2 }} value={form.description} onChange={handleChange} />
            <TextField label="Giá" name="price" type="number" fullWidth sx={{ mb: 2 }} value={form.price} onChange={handleChange} />
            <TextField label="Số lượng" name="stock" type="number" fullWidth sx={{ mb: 2 }} value={form.stock} onChange={handleChange} />
            <Button variant="contained" onClick={handleSubmit}>
                {mode === 'add' ? 'Thêm' : 'Cập nhật'}
            </Button>
        </Paper>
    );
}
