import API from './axios'

export const getStreak = () => API.get('/streak')