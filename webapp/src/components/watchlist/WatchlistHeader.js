import WatchlistTypeLink from './WatchlistTypeLink';

import './WatchlistHeader.css';


function WatchlistHeader(props) {

    return (
        <div className='WatchlistHeader'>
            <WatchlistTypeLink path='/watchlist/anime' title='Anime' />
            <WatchlistTypeLink path='/watchlist/manga' title='Manga' />
        </div>
    );
}


export default WatchlistHeader;
