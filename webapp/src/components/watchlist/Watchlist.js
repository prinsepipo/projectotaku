import { useState, useEffect } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';

import WatchlistHeader from './WatchlistHeader';
import Kanban from '../kanban/Kanban';

import './Watchlist.css';


function Watchlist(props) {
    const [animelist, setAnimelist] = useState({});
    const [mangalist, setMangalist] = useState({});

    const history = useHistory();
    const location = useLocation();

    const filterWatchlist = (watchlist, type) => {
        const list = {
            watch: [],
            watching: [],
            watched: [],
        };
        const sections = ['watch', 'watching', 'watched'];

        sections.forEach((section) => {
            list[section] = watchlist[section].filter((element) => element.type === type);
        })

        return list;
    }

    useEffect(() => {
        setAnimelist(() => filterWatchlist(props.watchlist, 'anime'));
        setMangalist(() => filterWatchlist(props.watchlist, 'manga'));
    }, [props.watchlist]);

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
                    <Kanban watchlist={animelist} setWatchlist={setAnimelist} />
                </Route>
                <Route path='/watchlist/manga'>
                    <Kanban watchlist={mangalist} setWatchlist={setMangalist} />
                </Route>
            </Switch>
        </div>
    );
}


export default Watchlist;
