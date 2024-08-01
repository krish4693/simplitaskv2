// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:4096/api';

export const register = (user) => axios.post(`${API_URL}/auth/register`, user);
export const login = (user) => axios.post(`${API_URL}/auth/login`, user);
export const fetchTasks = (token) => axios.get(`${API_URL}/tasks`, {
    headers: { 'x-access-token': token }
});
export const addTask = (task, token) => axios.post(`${API_URL}/tasks`, task, {
    headers: { 'x-access-token': token }
});
export const deleteTask = (id, token) => axios.delete(`${API_URL}/tasks/${id}`, {
    headers: { 'x-access-token': token }
});
