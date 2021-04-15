import { useContext, useEffect } from 'react'
import { Redirect, Route, useHistory } from 'react-router-dom';

import UserContext from '../context/UserContext';

import Navbar from './layout/navbar/Navbar';
import MainContent from './layout/MainContent';
import Watchlist from './watchlist/Watchlist';

import Browse from './browse/Browse';

import './Home.css';


function Home(props) {
    const {isAuthenticated} = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        // Watchlist will be our index route.
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
                    <Watchlist />
                </Route>
                <Route path='/browse'>
                    <Browse />
                </Route>
            </MainContent>
        </div>
    );
}


export default Home;
