import axios from 'axios'
//PRODUCTION
// const API = axios.create({ baseURL: 'https://cip-mern.herokuapp.com/'})
//DEVELOPMENT
const API = axios.create({ baseURL: 'http://localhost:5000/'})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('user')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`;
    }
    return req;
  });

//Users
export const register = (formData) => API.post('/api/users/register', formData)
export const login = (formData) => API.post(`/api/users/login`, formData)
export const updateProfile = (formData, userId) => API.put(`/api/users/updateprofile/${userId}`, formData)
export const deleteProfile = (formData, userId) => API.post(`api/users/deleteprofile/${userId}`, formData)
export const getAllUsers = () => API.get('api/users')
export const adminUserUpdate = (formData, userId) => API.put(`/api/users/admin/updateuserprofile/${userId}`, formData)
export const adminDeleteProfile = (userId) => API.delete(`/api/users/admin/deleteuserprofile/${userId}`)
export const searchUsers = (searchQuery) => API.get(`/api/users/search?searchQuery=${searchQuery}`)
//Posts
export const submitPost = (formData) => API.post(`/api/posts/`, formData)
export const getAllPosts = () => API.get('/api/posts')
export const replyToPost = (data, id) => API.put(`/api/posts/reply/${id}`, data)
export const deletePost = (postId) => API.delete(`/api/posts/${postId}`)
export const updatePost = (formData, postId) => API.put(`/api/posts/${postId}`, formData)
export const replyToClinic = (data, id) => API.put(`/api/posts/replytoclinic/${id}`, data)