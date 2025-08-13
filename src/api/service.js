import { productsApi } from './products';
import { ordersApi } from './orders';
import { usersApi } from './users';
import { authApi } from './auth';

const service = {
    products: productsApi,
    orders: ordersApi,
    users: usersApi,
    auth: authApi
};

export default service;
