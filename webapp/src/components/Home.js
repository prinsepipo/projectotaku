import { useContext, useEffect } from 'react'
import { Redirect, Route, useHistory } from 'react-router-dom';

import UserContext from '../context/UserContext';
import WatchlistContext from '../context/WatchlistContext';

import { backendAPI } from '../utils/api';

import Navbar from './layout/navbar/Navbar';
import MainContent from './layout/MainContent';
import Watchlist from './watchlist/Watchlist';

import Browse from './browse/Browse';

import './Home.css';


function Home(props) {
    const {isAuthenticated} = useContext(UserContext);
    const [watchlist, setWatchlist] = useContext(WatchlistContext);
    const history = useHistory();

    useEffect(() => {
        const headers = {
            Authorization: `Token ${localStorage.getItem('TOKEN')}`,
        };
        backendAPI.get('watchlist/', {headers})
            .then((response) => {
                // Order watchlist items based on its status/section and link/position.
                const list = response.data;
                const newList = {
                    watch: [],
                    watching: [],
                    watched: [],
                };

                for (const section in newList) {
                    const sectionList = newList[section];
                    const filteredList = list.filter((element) => element.status === section);

                    while (filteredList.length !== 0) {
                        if (sectionList.length === 0) {
                            const tailItemIndex = filteredList.findIndex((element) => element.next_item_id === null);
                            const tailItem = filteredList.splice(tailItemIndex, 1)[0];
                            sectionList.unshift(tailItem);
                        } else {
                            const headItem = sectionList[0];
                            const prevItemIndex = filteredList.findIndex((element) => element.next_item_id === headItem.id);
                            const prevItem = filteredList.splice(prevItemIndex, 1)[0];
                            sectionList.unshift(prevItem);
                        }
                    }
                }

                setWatchlist(newList);
            })
            .catch((error) => {
                if (error.response) {
                    // Token used for authentication is no longer valid.
                    if (error.response.status === 401) {
                        history.push('/logout');
                    }
                } else {
                    history.push('/server-error');
                }
            });
    }, [setWatchlist, history]);

    // Home route is just a container for the watchlist and browse routes so
    // watchlist route will be our index route.
    useEffect(() => {
        if (history.location.pathname === '/') {
            history.push('/watchlist');
        }
    }, [history]);

    if (!isAuthenticated) {
        return <Redirect to='/logout' />
    }

    return (
        <div className='Home'>
            <Navbar />
            <MainContent>
                <Route path='/watchlist'>
                    <Watchlist watchlist={watchlist} />
                </Route>
                <Route path='/browse'>
                    <Browse />
                </Route>
            </MainContent>
        </div>
    );
}


export default Home;
