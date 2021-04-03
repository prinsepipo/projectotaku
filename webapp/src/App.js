import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';

import { UserProvider } from './context/UserContext';
import { WatchlistProvider } from './context/WatchlistContext';

import Home from './pages/home/Home';
import Watchlist from './pages/watchlist/Watchlist';
import ServerError from './pages/server-error/ServerError';
import Logout from './pages/Logout';


function App() {
  return (
    <UserProvider>
        <WatchlistProvider>
            <Router>
                <Switch>
                    <Route path='/watchlist'>
                        <Watchlist />
                    </Route>
                    <Route exact path='/'>
                        <Home />
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
