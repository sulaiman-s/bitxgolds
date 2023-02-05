import axios from 'axios';
import { store } from '../store/store';

const axiosInstance = axios.create({
    baseURL: `https://odd-pear-trout.cyclic.app`,
});

axiosInstance.interceptors.request.use((config) => {
    const state = store.getState();
    const token = state.auth.auth.idToken;
    config.params = config.params || {};
    //config.params['auth'] = token;
    return config;
});

export default axiosInstance;
