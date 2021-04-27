import { useEffect, useContext } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';

import WatchlistContext from '../../context/WatchlistContext';

import WatchlistHeader from './WatchlistHeader';
import Kanban from '../kanban/Kanban';

import './Watchlist.css';


function Watchlist(props) {
    const {
        animeList,
        setAnimeList,
        mangaList,
        setMangaList,
    } = useContext(WatchlistContext);

    const history = useHistory();
    const location = useLocation();

    // Watchlist is only a wrapper/container component. It has no content so we push/redirect
    // to /anime subroute since that contains our watchlist content. Why /anime subroute? No
    // particular reason.
    useEffect(() => {
        if (location.pathname === '/watchlist') {
            history.push('/watchlist/anime');
        }
    }, [location.pathname, history]);

    return (
        <div className='Watchlist'>
            <WatchlistHeader />
            <Switch>
                <Route path='/watchlist/anime'>
                    <Kanban
                        list={animeList}
                        setList={setAnimeList}
                        isFetchingWatchlist={props.isFetchingWatchlist}
                    />
                </Route>
                <Route path='/watchlist/manga'>
                    <Kanban
                        list={mangaList}
                        setList={setMangaList}
                        isFetchingWatchlist={props.isFetchingWatchlist}
                    />
                </Route>
            </Switch>
        </div>
    );
}


export default Watchlist;
