import { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem } from '@mui/material';
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
        <div>
            <h2>Quản lý đơn hàng</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Ngày tạo</TableCell>
                        <TableCell>User ID</TableCell>
                        <TableCell>Sản phẩm</TableCell>
                        <TableCell>Số lượng</TableCell>
                        <TableCell>Trạng thái</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((o) => (
                        <TableRow key={o.id}>
                            <TableCell>{new Date(o.createdAt).toLocaleString()}</TableCell>
                            <TableCell>{o.userId}</TableCell>
                            <TableCell>{o.items.map(i => i.productId).join(', ')}</TableCell>
                            <TableCell>{o.items.map(i => i.quantity).join(', ')}</TableCell>
                            <TableCell>
                                {user?.role === 'admin' ? (
                                    <Select
                                        value={o.status}
                                        onChange={(e) => handleChangeStatus(o.id, e.target.value)}
                                    >
                                        <MenuItem value="pending">pending</MenuItem>
                                        <MenuItem value="delivered">delivered</MenuItem>
                                        <MenuItem value="cancelled">cancelled</MenuItem>
                                    </Select>
                                ) : (
                                    o.status
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
