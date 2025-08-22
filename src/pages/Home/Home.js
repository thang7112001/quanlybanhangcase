import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Grid, Container, Typography ,TextField,Box, Slider, Paper, InputAdornment, Button, Collapse} from '@mui/material';
import service from '../../api/service';
import { motion, AnimatePresence } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [priceRange, setPriceRange] = useState([0, 100000000]);
    const maxPrice = products.reduce((max, p) => p.price > max ? p.price : max, 0);
    const [filtersOpen, setFiltersOpen] = useState(false);

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
    const filteredProducts = products.filter((p) => {
        const matchName = p.name.toLowerCase().includes(search.toLowerCase());
        const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
        return matchName && matchPrice;
    });


    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ mb: 3 }}>
                Sản phẩm của chúng tôi
            </Typography>

            <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, mb: 5, borderRadius: 3 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <TextField
                        label="Tìm kiếm theo tên sản phẩm"
                        variant="outlined"
                        fullWidth
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        variant="outlined"
                        onClick={() => setFiltersOpen(!filtersOpen)}
                        startIcon={<FilterListIcon />}
                        sx={{ flexShrink: 0 }}
                    >
                        Bộ lọc
                    </Button>
                </Box>

                <Collapse in={filtersOpen} timeout="auto" unmountOnExit>
                    <Box sx={{ pt: 3 }}>
                        <Typography gutterBottom>Lọc theo khoảng giá (₫)</Typography>
                        <Slider
                            value={priceRange}
                            max={maxPrice > 0 ? maxPrice : 100000000}
                            onChange={(e, newValue) => setPriceRange(newValue)}
                            valueLabelDisplay="auto"
                            valueLabelFormat={(value) => new Intl.NumberFormat("vi-VN").format(value)}
                            step={500000}
                            color="secondary"
                        />
                        <Typography align="center" variant="body2" color="text.secondary">
                            {new Intl.NumberFormat("vi-VN").format(priceRange[0])} ₫ -{" "}
                            {new Intl.NumberFormat("vi-VN").format(priceRange[1])} ₫
                        </Typography>
                    </Box>
                </Collapse>
            </Paper>

            <Grid container spacing={4} justifyContent="center">
                <AnimatePresence>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((p) => (
                            <Grid item key={p.id}>
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <ProductCard product={p} onDelete={handleDelete} />
                                </motion.div>
                            </Grid>
                        ))
                    ) : (
                        <Typography sx={{ mt: 4 }}>Không tìm thấy sản phẩm phù hợp</Typography>
                    )}
                </AnimatePresence>
            </Grid>
        </Container>
    );
}
