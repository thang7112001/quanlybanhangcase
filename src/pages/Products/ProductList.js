import { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow,Container, Paper, Typography, Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import service from '../../api/service';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const user = service.auth.getCurrentUser();

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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4">Quản lý sản phẩm</Typography>
                {user?.role === 'admin' && (
                    <Button
                        variant="contained"
                        component={Link}
                        to="/admin/products/add"
                        startIcon={<AddIcon />}
                    >
                        Thêm sản phẩm
                    </Button>
                )}
            </Box>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Tên</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Mô tả</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Giá</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Số lượng</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map(p => (
                            <TableRow key={p.id} hover>
                                <TableCell>{p.name}</TableCell>
                                <TableCell>{p.description}</TableCell>
                                <TableCell>{new Intl.NumberFormat('vi-VN').format(p.price)} ₫</TableCell>
                                <TableCell>{p.stock}</TableCell>
                                <TableCell align="right">
                                    {user?.role === 'admin' && (
                                        <>
                                            <IconButton component={Link} to={`/admin/products/edit/${p.id}`} color="primary">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton color="error" onClick={() => handleDelete(p.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    );
}
