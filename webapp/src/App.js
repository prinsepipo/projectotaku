import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';

import { UserProvider } from './context/UserContext';
import { WatchlistProvider } from './context/WatchlistContext';

import Home from './pages/home/Home';
import Watchlist from './pages/watchlist/Watchlist';
import Browse from './pages/browse/Browse';
import ServerError from './pages/server-error/ServerError';
import Logout from './pages/Logout';


function App() {
  return (
    <UserProvider>
        <WatchlistProvider>
            <Router>
                <Switch>
                    <Route exact path='/'>
                        <Home />
                    </Route>
                    <Route path='/watchlist'>
                        <Watchlist />
                    </Route>
                    <Route path='/browse'>
                        <Browse />
                    </Route>
                    <Route path='/logout'>
                        <Logout />
                    </Route>
                    <Route path='/server-error'>
                        <ServerError />
                    </Route>
                    <Route path='*'>
                        {/* TODO: 404 page not found. */}
                        <h1>Page not found.</h1>
                    </Route>
                </Switch>
            </Router>
        </WatchlistProvider>
    </UserProvider>
  );
}


export default App;
