import axios from 'axios'
//PRODUCTION
// const API = axios.create({ baseURL: 'https://cip-mern.herokuapp.com/'})
//DEVELOPMENT
const API = axios.create({ baseURL: 'http://localhost:5000/'})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('userProfile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userProfile')).token}`;
    }
    return req;
  });

export const register = (formData) => API.post('/api/users/register', formData)
export const login = (formData) => API.post(`/api/users/login`, formData)