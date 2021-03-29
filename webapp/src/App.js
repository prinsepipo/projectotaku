import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';

import { UserProvider } from './context/UserContext';

import Home from './pages/home/Home';
import Watchlist from './pages/watchlist/Watchlist';
import ServerError from './pages/server-error/ServerError';


function App() {
  return (
    <UserProvider>
        <Router>
            <Switch>
                <Route path='/watchlist'>
                    <Watchlist />
                </Route>
                <Route exact path='/'>
                    <Home />
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
    </UserProvider>
  );
}


export default App;
