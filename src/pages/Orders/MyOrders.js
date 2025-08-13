import { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import service from '../../api/service';

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const user = service.auth.getCurrentUser();

    useEffect(() => {
        if (user) {
            service.orders.getByUserId(user.id).then(setOrders);
        }
    }, [user]);

    return (
        <div>
            <h2>Đơn hàng của tôi</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Ngày tạo</TableCell>
                        <TableCell>Sản phẩm</TableCell>
                        <TableCell>Số lượng</TableCell>
                        <TableCell>Trạng thái</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((o) => (
                        <TableRow key={o.id}>
                            <TableCell>{new Date(o.createdAt).toLocaleString()}</TableCell>
                            <TableCell>{o.items.map(i => i.productId).join(', ')}</TableCell>
                            <TableCell>{o.items.map(i => i.quantity).join(', ')}</TableCell>
                            <TableCell>{o.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
