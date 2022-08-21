import axios from 'axios'

const domain = 'https://api.alquran.cloud/'
const baseURL = `${domain}`;
const baseUrlunsplash = 'https://api.unsplash.com/'

export const json = axios.create({
    baseURL,
    headers:{
        'Content-type': 'application/json'
    }
});

export const unsplash = axios.create({
    baseUrlunsplash,
    headers:{
        'Content-type': 'application/json'
    }
});