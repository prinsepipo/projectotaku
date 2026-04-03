import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

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
                <Route path='/watchlist'>
                    <Redirect to='/watchlist/anime' />
                </Route>
                <Route path='/watchlist/*'>
                    <Redirect to='/404' />
                </Route>
            </Switch>
        </div>
    );
}


export default Watchlist;
