import { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Container, Paper, Typography, Chip  } from '@mui/material';
import service from '../../api/service';

const statusChip = {
    pending: { label: 'Đang xử lý', color: 'warning' },
    delivered: { label: 'Đã giao', color: 'success' },
    cancelled: { label: 'Đã hủy', color: 'error' },
};

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const user = service.auth.getCurrentUser();

    useEffect(() => {
        if (user) {
            service.orders.getByUserId(user.id).then(setOrders);
        }
    }, [user]);

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>Đơn hàng của tôi</Typography>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Ngày tạo</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Sản phẩm (ID)</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Số lượng</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Trạng thái</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((o) => (
                            <TableRow key={o.id} hover>
                                <TableCell>{new Date(o.createdAt).toLocaleString('vi-VN')}</TableCell>
                                <TableCell>{o.items.map(i => i.productId).join(', ')}</TableCell>
                                <TableCell>{o.items.map(i => i.quantity).join(', ')}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={statusChip[o.status]?.label || o.status}
                                        color={statusChip[o.status]?.color || 'default'}
                                        size="small"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    );
}
