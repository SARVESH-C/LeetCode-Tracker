import API from './axios'

export const getAllCategories = () => API.get('/categories')