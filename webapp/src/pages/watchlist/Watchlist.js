import Kanban from './kanban/Kanban';

import './Watchlist.css';


function Watchlist() {
    return (
        <div className='Watchlist'>
            <div className='WatchlistHeader'>
                <div className='WatchlistHeaderContainer'>
                    <a className='WatchlistHeader-link' href='/watchlist'>Project Otaku</a>
                </div>
            </div>
            <Kanban />
        </div>
    );
}


export default Watchlist;
