import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import service from '../../api/service';

export default function ProductCard({ product, onDelete }) {
    const user = service.auth.getCurrentUser();

    return (
        <Card sx={{ width: 250, m: 1 }}>
            <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2">{product.description}</Typography>
                <Typography variant="body1" color="primary">
                    {product.price} ₫
                </Typography>
                <Typography variant="caption">Còn lại: {product.stock}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" component={Link} to={`/products/${product.id}`}>Xem</Button>

                {user?.role === 'admin' && (
                    <>
                        <Button size="small" component={Link} to={`/admin/products/edit/${product.id}`}>Sửa</Button>
                        <Button size="small" color="error" onClick={() => onDelete(product.id)}>Xoá</Button>
                    </>
                )}
            </CardActions>
        </Card>
    );
}
