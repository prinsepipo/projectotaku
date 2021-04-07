import { useState, useContext, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import UserContext from '../../context/UserContext';
import WatchlistContext from '../../context/WatchlistContext';

import { backendAPI } from '../../utils/api';

import Kanban from './kanban/Kanban';
import Browse from './browse/Browse';
import AccountOptions from './AccountOptions';

import './Watchlist.css';


function Watchlist(props) {
    const [isBrowsing, setIsBrowsing] = useState(false);
    const user = useContext(UserContext);
    const [watchlist, setWatchlist] = useContext(WatchlistContext);
    const history = useHistory();

    useEffect(() => {
        const headers = {
            Authorization: `Token ${localStorage.getItem('TOKEN')}`,
        };
        backendAPI.get('watchlist/', {headers})
            .then((response) => {
                setWatchlist(response.data);
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

    if (!user.isAuthenticated) {
        return <Redirect push to='/' />
    }

    const toggleBrowsing = () => {
        setIsBrowsing(!isBrowsing);
    }

    return (
        <div className='Watchlist'>
            <div className='WatchlistHeader'>
                <div className='WatchlistHeaderContainer'>
                    <a className='WatchlistHeader-link' href='/watchlist'>Project Otaku</a>
                    <AccountOptions />
                </div>
            </div>
            <Kanban watchlist={watchlist} toggleBrowsing={toggleBrowsing} />
            <Browse isBrowsing={isBrowsing} toggleBrowsing={toggleBrowsing} />
        </div>
    );
}


export default Watchlist;
