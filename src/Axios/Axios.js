import axios from 'axios';
export const axiosConfig = axios.create({
    baseURL: 'https://api.picoehr.com/api/v1'
})