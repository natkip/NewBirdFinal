import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5001/api' }); //WILL REPLACE WITH RENDER LINK IN .env

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.authorization = token;
    return config;
});

export default API;