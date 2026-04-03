import { createContext, useState } from 'react';


const WatchlistContext = createContext();

const WatchlistProvider = (props) => {
    const [animeList, setAnimeList] = useState({
        watch: [],
        watching: [],
        watched: [],
    });
    const [mangaList, setMangaList] = useState({
        watch: [],
        watching: [],
        watched: [],
    });
    const state = {
        animeList,
        setAnimeList,
        mangaList,
        setMangaList,
    }

    return (
        <WatchlistContext.Provider value={state}>
            {props.children}
        </WatchlistContext.Provider>
    );
}


export { WatchlistProvider };
export default WatchlistContext;
