import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';

import Home from './pages/home/Home';
import Watchlist from './pages/watchlist/Watchlist';


function App() {
  return (
    <Router>
        <Switch>
            <Route path='/watchlist'>
                <Watchlist />
            </Route>
            <Route exact path='/'>
                <Home />
            </Route>
            <Route path='*'>
                {/* TODO: 404 page not found. */}
                <h1>Page not found.</h1>
            </Route>
        </Switch>
    </Router>
  );
}


export default App;
