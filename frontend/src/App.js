import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';

import { UserProvider } from './context/UserContext';
import { WatchlistProvider } from './context/WatchlistContext';

import Home from './components/Home';
import Auth from './components/auth/Auth';
import ServerError from './components/server-error/ServerError';
import Logout from './components/Logout';
import PageNotFound from './components/PageNotFound';


function App() {
  return (
    <UserProvider>
        <WatchlistProvider>
            <Router>
                <Switch>
                    <Route path='/auth'>
                        <Auth />
                    </Route>
                    <Route path='/logout'>
                        <Logout />
                    </Route>
                    <Route path='/server-error'>
                        <ServerError />
                    </Route>
                    <Route path='/404'>
                        <PageNotFound />
                    </Route>
                    <Route path='/'>
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </WatchlistProvider>
    </UserProvider>
  );
}


export default App;
