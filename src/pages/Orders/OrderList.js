import { useEffect, useState } from 'react';
import {Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, Container, Typography, Paper} from '@mui/material';
import service from '../../api/service';

export default function OrderList() {
    const [orders, setOrders] = useState([]);
    const user = service.auth.getCurrentUser();

    useEffect(() => {
        service.orders.getAll().then(setOrders);
    }, []);

    const handleChangeStatus = async (id, status) => {
        const order = orders.find(o => o.id === id);
        await service.orders.update(id, { ...order, status });
        setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
    };

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>Quản lý đơn hàng</Typography>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Ngày tạo</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>User ID</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Sản phẩm (ID)</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Số lượng</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Trạng thái</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((o) => (
                            <TableRow key={o.id} hover>
                                <TableCell>{new Date(o.createdAt).toLocaleString('vi-VN')}</TableCell>
                                <TableCell>{o.userId}</TableCell>
                                <TableCell>{o.items.map(i => i.productId).join(', ')}</TableCell>
                                <TableCell>{o.items.map(i => i.quantity).join(', ')}</TableCell>
                                <TableCell>
                                    {user?.role === 'admin' ? (
                                        <Select
                                            value={o.status}
                                            onChange={(e) => handleChangeStatus(o.id, e.target.value)}
                                            sx={{ minWidth: 120 }}
                                            size="small"
                                        >
                                            <MenuItem value="pending">Pending</MenuItem>
                                            <MenuItem value="delivered">Delivered</MenuItem>
                                            <MenuItem value="cancelled">Cancelled</MenuItem>
                                        </Select>
                                    ) : (
                                        o.status
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
