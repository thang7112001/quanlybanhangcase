import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Grid, Container, Typography } from '@mui/material';
import service from '../../api/service';
import { motion } from 'framer-motion';

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        service.products.getAll().then(setProducts);
    }, []);

    const handleDelete = async (id) => {
        const orders = await service.orders.getAll();
        const isInOrder = orders.some(o => o.items.some(i => i.productId === id));

        if (isInOrder) {
            alert('Không thể xoá sản phẩm này vì đã có trong đơn hàng!');
            return;
        }

        if (window.confirm('Bạn có chắc muốn xoá sản phẩm này?')) {
            await service.products.remove(id);
            setProducts(products.filter(p => p.id !== id));
        }
    };


    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
                Sản phẩm nổi bật
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {products.map((p, index) => (
                    <Grid item key={p.id}>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <ProductCard product={p} onDelete={handleDelete} />
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
