import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (username, password) =>
  API.post('/login', { username, password });

export const getTodos = () => API.get('/todos');
export const createTodo = (text) => API.post('/todos', { text });
export const updateTodo = (id, text) => API.put(`/todos/${id}`, { text });
export const deleteTodo = (id) => API.delete(`/todos/${id}`);
