import WatchlistHeader from './WatchlistHeader';
import Kanban from './Kanban';

import './Watchlist.css';


function Watchlist() {
    return (
        <div className='Watchlist'>
            <WatchlistHeader />
            <Kanban />
        </div>
    );
}


export default Watchlist;
