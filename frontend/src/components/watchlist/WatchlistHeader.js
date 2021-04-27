import WatchlistTypeLink from './WatchlistTypeLink';
import WatchlistSearch from './WatchlistSearch';

import './WatchlistHeader.css';


function WatchlistHeader(props) {

    return (
        <div className='WatchlistHeader'>
            <WatchlistTypeLink path='/watchlist/anime' title='Anime' />
            <WatchlistTypeLink path='/watchlist/manga' title='Manga' />
            <WatchlistSearch />
        </div>
    );
}


export default WatchlistHeader;
