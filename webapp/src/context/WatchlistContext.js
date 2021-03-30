import { createContext, useState } from 'react';


const WatchlistContext = createContext();

const WatchlistProvider = (props) => {
    const [watchlist, setWatchlist] = useState([]);

    return (
        <WatchlistContext.Provider value={[watchlist, setWatchlist]}>
            {props.children}
        </WatchlistContext.Provider>
    );
}


export { WatchlistProvider };
export default WatchlistContext;
