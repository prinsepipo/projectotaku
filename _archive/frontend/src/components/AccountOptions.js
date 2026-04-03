import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import UserContext from '../context/UserContext';

import './AccountOptions.css';


class AccountOptions extends React.Component {
    static contextType = UserContext;

    render() {
        return (
            <ul className='AccountOptions'>
                <li className='AccountOptions-item'>
                    <Link to='/logout'>Logout</Link>
                </li>
            </ul>
        );
    }
}


export default withRouter(AccountOptions);
