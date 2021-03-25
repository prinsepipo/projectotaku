import axios from 'axios';


const watchlist = axios.create({
    baseURL: 'http://localhost:8000/api/',
    timeout: 1000,
});

const jikan = axios.create({
    baseURL: 'https://api.jikan.moe/v3/',
})


export {
    watchlist,
    jikan,
}
