import React from 'react';
import { withRouter } from 'react-router-dom';

import UserContext from '../../context/UserContext';

import { watchlistAPI } from '../../utils/api';

import './AccountOptions.css';


class AccountOptions extends React.Component {
    static contextType = UserContext;

    logout = () => {
        const headers = { Authorization: `Token ${localStorage.getItem('TOKEN')}`}
        watchlistAPI.post('auth/logout/', null, {headers})
            .then((response) => {
                localStorage.removeItem('TOKEN');

                this.context.setIsAuthenticated(() => false);

                this.props.history.push('/');
            })
            .catch((error) => {
                if (error.response) {
                    // Do something to tell the user that the server responds with an error.
                } else {
                    this.props.history.push('/server-error');
                }
            });
    }

    render() {
        return (
            <ul className='AccountOptions'>
                <li className='AccountOptions-item'>
                    <button onClick={this.logout}>Logout</button>
                </li>
            </ul>
        );
    }
}


export default withRouter(AccountOptions);
