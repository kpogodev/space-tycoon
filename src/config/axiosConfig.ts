import axios from 'axios'

const isProduction = import.meta.env.PROD
const prodApiUrl =  import.meta.env.VITE_BACKEND_API_URL

export const axiosInstanceInternal = axios.create({
    baseURL: isProduction ? prodApiUrl : 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
})

export const axiosInstanceExternal = axios.create({
    baseURL: 'https://api.spacetraders.io/v2',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('space-token')}`
    },
})