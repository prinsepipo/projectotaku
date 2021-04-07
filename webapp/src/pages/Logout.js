import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../context/UserContext';

import { backendAPI } from '../utils/api';


function Logout(props) {
    const {setIsAuthenticated} = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        // Delete token from database then client.
        const headers = { Authorization: `Token ${localStorage.getItem('TOKEN')}` };
        backendAPI.post('auth/logout/', null, {headers})
            .catch((error) => {});

        localStorage.removeItem('TOKEN');
        setIsAuthenticated(false);
        history.push('/');
    }, [setIsAuthenticated, history]);

    return (
        <div>
            <h1>Logging out.</h1>
        </div>
    );
}


export default Logout;
