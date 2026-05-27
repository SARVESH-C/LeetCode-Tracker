import API from './axios'

export const getAllProblems = () => API.get('/problems')
export const getProblemsByCategory = (categoryId) => API.get(`/problems/category/${categoryId}`)
export const logSolvedProblem = (data) => API.post('/problems/log', data)
export const getSolvedProblems = () => API.get('/problems/solved')