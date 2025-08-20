import {Card, CardContent, Typography, CardActions, Button, CardMedia, Box} from '@mui/material';
import { Link } from 'react-router-dom';
import service from '../../api/service';
import { motion } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function ProductCard({ product, onDelete }) {
    const user = service.auth.getCurrentUser();
    const placeholderImage = 'https://via.placeholder.com/280x160.png?text=No+Image';

    return (
        <motion.div whileHover={{ scale: 1.05, y: -5 }}>
            <Card sx={{ width: 280, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardMedia
                    component="img"
                    height="160"
                    image={product.image || placeholderImage}
                    alt={product.name}
                    sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div" sx={{ color: 'primary.main' }}>
                        {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                        {product.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                        <Typography variant="h6" color="secondary.main">
                            {new Intl.NumberFormat('vi-VN').format(product.price)} ₫
                        </Typography>
                        <Typography variant="caption">
                            Còn lại: {product.stock}
                        </Typography>
                    </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                    <Button size="small" component={Link} to={`/products/${product.id}`} startIcon={<VisibilityIcon />}>
                        Xem
                    </Button>
                    {user?.role === 'admin' && (
                        <>
                            <Button size="small" component={Link} to={`/admin/products/edit/${product.id}`} startIcon={<EditIcon />}>
                                Sửa
                            </Button>
                            <Button size="small" color="error" onClick={() => onDelete(product.id)} startIcon={<DeleteIcon />}>
                                Xoá
                            </Button>
                        </>
                    )}
                </CardActions>
            </Card>
        </motion.div>
    );
}