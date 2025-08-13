import { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import service from '../../api/service';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const user = service.auth.getCurrentUser();

    useEffect(() => {
        service.products.getAll().then(setProducts);
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Xoá sản phẩm này?')) {
            await service.products.remove(id);
            setProducts(products.filter(p => p.id !== id));
        }
    };

    return (
        <div>
            <h2>Quản lý sản phẩm</h2>
            {user?.role === 'admin' && (
                <Button variant="contained" component={Link} to="/admin/products/add">Thêm sản phẩm</Button>
            )}
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Tên</TableCell>
                        <TableCell>Mô tả</TableCell>
                        <TableCell>Giá</TableCell>
                        <TableCell>Số lượng</TableCell>
                        <TableCell>Hành động</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map(p => (
                        <TableRow key={p.id}>
                            <TableCell>{p.name}</TableCell>
                            <TableCell>{p.description}</TableCell>
                            <TableCell>{p.price}</TableCell>
                            <TableCell>{p.stock}</TableCell>
                            <TableCell>
                                {user?.role === 'admin' && (
                                    <>
                                        <Button component={Link} to={`/admin/products/edit/${p.id}`}>Sửa</Button>
                                        <Button color="error" onClick={() => handleDelete(p.id)}>Xoá</Button>
                                    </>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
