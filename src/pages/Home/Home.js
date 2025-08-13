import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import service from '../../api/service';
import ProductCard from './ProductCard';

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        service.products.getAll().then(setProducts);
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc muốn xoá sản phẩm này?')) {
            await service.products.remove(id);
            setProducts(products.filter(p => p.id !== id));
        }
    };

    return (
        <Grid container spacing={2}>
            {products.map((p) => (
                <Grid item key={p.id}>
                    <ProductCard product={p} onDelete={handleDelete} />
                </Grid>
            ))}
        </Grid>
    );
}
