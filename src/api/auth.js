import axios from 'axios';
import { URL_USERS } from './url';
import { setItem, getItem, removeItem } from '../utils/storage';

export const authApi = {
    login: async (username, password) => {
        const res = await axios.get(`${URL_USERS}?username=${username}&password=${password}`);
        const user = res.data[0];
        if (user) {
            setItem('currentUser', user);
            return user;
        }
        return null;
    },
    register: async (newUser) => {
        const res = await axios.post(URL_USERS, newUser);
        return res.data;
    },
    getCurrentUser: () => {
        return getItem('currentUser');
    },
    logout: () => {
        removeItem('currentUser');
    }
};
