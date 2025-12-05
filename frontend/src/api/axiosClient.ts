import axios from "axios"
import { store } from "../redux/store";


export const axiosClient = axios.create({ //refactor rename to api 
    baseURL: import.meta.env.VITE_API_URL,
    // headers: {"Content-Type":"application/json"}
});

export const apiAuth = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // headers: {"Content-Type":"application/json"}
});

apiAuth.interceptors.request.use((config) => {
    const token = store.getState().auth.auth?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
});