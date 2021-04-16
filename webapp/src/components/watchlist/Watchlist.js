import Kanban from '../kanban/Kanban';

import './Watchlist.css';


function Watchlist(props) {
    return (
        <div className='Watchlist'>
            <Kanban watchlist={props.watchlist} />
        </div>
    );
}


export default Watchlist;
