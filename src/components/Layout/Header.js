import { AppBar, Toolbar, Button, Typography, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useAuth} from "../../pages/Auth/AuthContext";


export default function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <AppBar position="static" color="primary" enableColorOnDark>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Cửa hàng
                    </Link>
                </Typography>

                <Stack direction="row" spacing={1}>
                    <Button color="inherit" component={Link} to="/" startIcon={<HomeIcon />}>
                        Trang chủ
                    </Button>

                    {user?.role === 'admin' && (
                        <>
                            <Button color="inherit" component={Link} to="/admin/products" startIcon={<AdminPanelSettingsIcon />}>
                                Sản phẩm
                            </Button>
                            <Button color="inherit" component={Link} to="/admin/orders" startIcon={<ShoppingBasketIcon />}>
                                Đơn hàng
                            </Button>
                        </>
                    )}

                    {user?.role === 'user' && (
                        <Button color="inherit" component={Link} to="/my-orders" startIcon={<ShoppingBasketIcon />}>
                            Đơn hàng của tôi
                        </Button>
                    )}

                    {user ? (
                        <>
                            <Button color="inherit" component={Link} to="/profile" startIcon={<AccountCircleIcon />}>
                                {user.name}
                            </Button>
                            <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
                                Đăng xuất
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/login" startIcon={<LoginIcon />}>
                                Đăng nhập
                            </Button>
                            <Button color="inherit" component={Link} to="/register" startIcon={<PersonAddIcon />}>
                                Đăng ký
                            </Button>
                        </>
                    )}
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
