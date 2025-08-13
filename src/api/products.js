import axios from 'axios';
import { URL_PRODUCTS } from './url';

export const productsApi = {
    getAll: async () => {
        const res = await axios.get(URL_PRODUCTS);
        return res.data;
    },
    getById: async (id) => {
        const res = await axios.get(`${URL_PRODUCTS}/${id}`);
        return res.data;
    },
    create: async (product) => {
        const res = await axios.post(URL_PRODUCTS, product);
        return res.data;
    },
    update: async (id, product) => {
        const res = await axios.put(`${URL_PRODUCTS}/${id}`, product);
        return res.data;
    },
    remove: async (id) => {
        await axios.delete(`${URL_PRODUCTS}/${id}`);
    }
};
