import {Routes, Route} from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

import Home from './pages/Home/Home';
import ProductList from './pages/Products/ProductList';
import ProductForm from './pages/Products/ProductForm';
import ProductDetail from './pages/Products/ProductDetail';

import MyOrders from './pages/Orders/MyOrders';
import OrderList from './pages/Orders/OrderList';

import Profile from './pages/Profile/Profile';

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

import NotFound from './pages/NotFound/NotFound';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
    return (
        <>
            <Header/>
            <div style={{padding: '20px'}}>
                <Routes>
                    <Route path="/" element={<Home/>}/>

                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>

                    <Route path="/products/:id" element={<ProductDetail/>}/>
                    <Route path="/admin/products"
                           element={<PrivateRoute roles={['admin']}><ProductList/></PrivateRoute>}/>
                    <Route path="/admin/products/add"
                           element={<PrivateRoute roles={['admin']}><ProductForm mode="add"/></PrivateRoute>}/>
                    <Route path="/admin/products/edit/:id"
                           element={<PrivateRoute roles={['admin']}><ProductForm mode="edit"/></PrivateRoute>}/>

                    <Route path="/my-orders" element={<PrivateRoute roles={['user']}><MyOrders/></PrivateRoute>}/>
                    <Route path="/admin/orders" element={<PrivateRoute roles={['admin']}><OrderList/></PrivateRoute>}/>

                    <Route path="/profile" element={<PrivateRoute roles={['admin', 'user']}><Profile/></PrivateRoute>}/>

                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </div>
            <Footer/>
        </>
    );
}
