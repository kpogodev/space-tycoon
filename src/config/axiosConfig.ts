import axios from 'axios'

export const axiosInstanceInternal = axios.create({
    baseURL: 'http://localhost:5000/api',
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