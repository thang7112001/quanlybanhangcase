import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, Paper, TextField } from '@mui/material';
import service from '../../api/service';

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const user = service.auth.getCurrentUser();

    useEffect(() => {
        service.products.getById(id).then(setProduct);
    }, [id]);

    const handleBuy = async () => {
        if (!user) {
            alert('Vui lòng đăng nhập để mua hàng!');
            navigate('/login');
            return;
        }
        const order = {
            userId: user.id,
            items: [{ productId: product.id, quantity }],
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        await service.orders.create(order);
        alert('Đặt hàng thành công!');
        navigate(user.role === 'admin' ? '/admin/orders' : '/my-orders');
    };

    if (!product) return <div>Đang tải...</div>;

    return (
        <Paper sx={{ p: 3, maxWidth: 500, mx: 'auto' }}>
            <Typography variant="h4">{product.name}</Typography>
            <Typography>{product.description}</Typography>
            <Typography>Giá: {product.price} ₫</Typography>
            <Typography>Còn lại: {product.stock}</Typography>
            <TextField
                type="number"
                label="Số lượng"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                sx={{ my: 2 }}
                fullWidth
            />
            <Button variant="contained" onClick={handleBuy}>Mua</Button>
        </Paper>
    );
}
