import axios from 'axios';

const jikanAPI = axios.create({
    baseURL: 'https://api.jikan.moe/v4/',
});

const actions = {
    getSeasonalAnime: async () => {
        const res = await jikanAPI.get(`seasons/now`);

        if (res.status === 200) {
            return res.data.data;
        }

        return [];
    },
    searchAnime: async (query) => {
        const res = await jikanAPI.get(`anime?q=${query}&limit=10`);

        if (res.status === 200) {
            return res.data.data;
        }

        return [];
    },
    searchManga: async (query) => {
        const res = await jikanAPI.get(`manga?q=${query}&limit=10`);

        if (res.status === 200) {
            return res.data.data;
        }

        return [];
    },
};

export {
    jikanAPI,
};

export default actions;
