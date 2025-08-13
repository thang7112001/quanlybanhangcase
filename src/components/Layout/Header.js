import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import service from '../../api/service';

export default function Header() {
    const navigate = useNavigate();
    const user = service.auth.getCurrentUser();

    const handleLogout = () => {
        service.auth.logout();
        navigate('/');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Quản lý bán hàng
                </Typography>

                <Button color="inherit" component={Link} to="/">Trang chủ</Button>

                {user?.role === 'admin' && (
                    <>
                        <Button color="inherit" component={Link} to="/admin/products">Quản lý sản phẩm</Button>
                        <Button color="inherit" component={Link} to="/admin/orders">Quản lý đơn hàng</Button>
                    </>
                )}

                {user?.role === 'user' && (
                    <>
                        <Button color="inherit" component={Link} to="/my-orders">Đơn hàng của tôi</Button>
                    </>
                )}

                {user ? (
                    <>
                        <Button color="inherit" component={Link} to="/profile">{user.name}</Button>
                        <Button color="inherit" onClick={handleLogout}>Đăng xuất</Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/login">Đăng nhập</Button>
                        <Button color="inherit" component={Link} to="/register">Đăng ký</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}
