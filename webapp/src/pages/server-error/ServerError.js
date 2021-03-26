import { Link } from 'react-router-dom';

import './ServerError.css';


function ServerError(props) {
    return (
        <div className='ServerError'>
            <h1>There seems to be a problem with the server. Please try again later.</h1>
            <Link to='/'>Go back.</Link>
        </div>
    );
}


export default ServerError;
