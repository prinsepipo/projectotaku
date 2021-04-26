import axios from 'axios';

const jikanAPI = axios.create({
    baseURL: 'https://api.jikan.moe/v3/',
})


export {
    jikanAPI,
}
