import axios from 'axios'

const domain = 'https://api.alquran.cloud/'
const baseURL = `${domain}`;

export const json = axios.create({
    baseURL,
    headers:{
        'Content-type': 'application/json'
    }
});