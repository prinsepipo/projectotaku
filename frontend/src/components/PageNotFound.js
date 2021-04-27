import { Link } from 'react-router-dom';

import './PageNotFound.css';


function PageNotFound(props) {
    return (
        <div className='PageNotFound'>
            <h1>Page Not Found.</h1>
            <Link to='/'>Back to homepage.</Link>
        </div>
    );
}


export default PageNotFound;
