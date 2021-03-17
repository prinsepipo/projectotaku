import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';

import Home from './home/Home';


function App() {
  return (
    <Router>
        <Switch>
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
