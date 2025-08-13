import axios from 'axios';
import { URL_USERS } from './url';

export const usersApi = {
    getAll: async () => {
        const res = await axios.get(URL_USERS);
        return res.data;
    },
    getById: async (id) => {
        const res = await axios.get(`${URL_USERS}/${id}`);
        return res.data;
    },
    update: async (id, user) => {
        const res = await axios.put(`${URL_USERS}/${id}`, user);
        return res.data;
    }
};
