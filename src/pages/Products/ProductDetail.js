import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {Button, Typography, Paper, TextField, Container, Grid, Box, IconButton, Snackbar, Alert} from '@mui/material';
import service from '../../api/service';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const user = service.auth.getCurrentUser();
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
    const placeholderImage = 'https://via.placeholder.com/800x600.png?text=No+Image';

    useEffect(() => {
        service.products.getById(id).then(setProduct);
    }, [id]);
    const handleQuantityChange = (amount) => {
        setQuantity(prev => {
            const newQuantity = prev + amount;
            if (newQuantity < 1) return 1;
            if (newQuantity > product.stock) return product.stock;
            return newQuantity;
        });
    };

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
        const newStock = product.stock - quantity;
        await service.products.update(product.id, { ...product, stock: newStock });
        setNotification({ open: true, message: 'Đặt hàng thành công!', severity: 'success' });
        setTimeout(() => {
            navigate(user.role === 'admin' ? '/admin/orders' : '/my-orders');
        }, 1500);
    };

    if (!product) return <div>Đang tải...</div>;

    return (
        <Container sx={{ mt: 4 }}>
            <Paper sx={{ p: 4 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Box
                            component="img"
                            sx={{ width: '100%', height: 'auto', borderRadius: 2, objectFit: 'cover' }}
                            src={product.image || placeholderImage}
                            alt={product.name}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" gutterBottom>{product.name}</Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>{product.description}</Typography>
                        <Typography variant="h5" color="secondary" sx={{ mb: 2 }}>
                            Giá: {new Intl.NumberFormat('vi-VN').format(product.price)} ₫
                        </Typography>
                        <Typography variant="subtitle1" sx={{ mb: 2 }}>Còn lại: {product.stock}</Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                            <Typography sx={{ mr: 2 }}>Số lượng:</Typography>
                            <IconButton onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                                <RemoveIcon />
                            </IconButton>
                            <TextField
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                sx={{ width: 80, mx: 1, textAlign: 'center' }}
                                inputProps={{ min: 1, max: product.stock, style: { textAlign: 'center' } }}
                            />
                            <IconButton onClick={() => handleQuantityChange(1)} disabled={quantity >= product.stock}>
                                <AddIcon />
                            </IconButton>
                        </Box>

                        <Button variant="contained" color="secondary" size="large" onClick={handleBuy} disabled={product.stock === 0}>
                            {product.stock > 0 ? 'Mua ngay' : 'Hết hàng'}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <Snackbar open={notification.open} autoHideDuration={6000} onClose={() => setNotification({ ...notification, open: false })}>
                <Alert onClose={() => setNotification({ ...notification, open: false })} severity={notification.severity} sx={{ width: '100%' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}
