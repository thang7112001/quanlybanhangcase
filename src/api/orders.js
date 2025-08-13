import axios from 'axios';
import { URL_ORDERS } from './url';

export const ordersApi = {
    getAll: async () => {
        const res = await axios.get(URL_ORDERS);
        return res.data;
    },
    getByUserId: async (userId) => {
        const res = await axios.get(`${URL_ORDERS}?userId=${userId}`);
        return res.data;
    },
    create: async (order) => {
        const res = await axios.post(URL_ORDERS, order);
        return res.data;
    },
    update: async (id, order) => {
        const res = await axios.put(`${URL_ORDERS}/${id}`, order);
        return res.data;
    }
};
