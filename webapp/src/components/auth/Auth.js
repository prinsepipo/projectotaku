import React from 'react';
import { Redirect } from 'react-router-dom';

import UserContext from '../../context/UserContext';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import './Auth.css';


class Auth extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            form: LoginForm,
        };
    }

    render() {
        if (this.context.isAuthenticated) {
            return <Redirect push to='/watchlist' />
        }

        return (
            <div className='Auth'>
                <div className='AuthHeader'>
                    <h1 className='AuthHeader-title'>Project Otaku</h1>
                    <p className='AuthHeader-details'>Create and manage your anime and manga list.</p>
                </div>
                <div className='UserForm'>
                    <this.state.form swapForm={this.swapForm} />
                </div>
            </div>
        );
    }

    swapForm = () => {
        let form;

        if (this.state.form === LoginForm) {
            form = RegisterForm;
        } else {
            form = LoginForm;
        }

        this.setState({
            form: form,
        })
    }
}


export default Auth;
