import axios from 'axios';


const watchlistAPI = axios.create({
    baseURL: 'http://localhost:8000/api/',
    timeout: 1000,
});

const jikanAPI = axios.create({
    baseURL: 'https://api.jikan.moe/v3/',
})


export {
    watchlistAPI,
    jikanAPI,
}
