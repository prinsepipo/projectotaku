import { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import UserContext from '../../context/UserContext';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import './Auth.css';


function Auth(props) {
    const [useLoginComponent, setUseLoginComponent] = useState(true);
    const { isAuthenticated } = useContext(UserContext);

    const swapFormComponent = () => {
        setUseLoginComponent((oldVal) => !oldVal);
    }

    if (isAuthenticated) {
        return <Redirect to='/watchlist' />
    }

    return (
        <div className='Auth'>
            <div className='AuthHeader'>
                <h1 className='AuthHeader-title'>Project Otaku</h1>
                <p className='AuthHeader-details'>Create and manage your anime and manga list.</p>
            </div>
            <div className='UserForm'>
                {
                    useLoginComponent
                    ? <LoginForm swapFormComponent={swapFormComponent} />
                    : <RegisterForm swapFormComponent={swapFormComponent} />
                }
            </div>
        </div>
    );
}


export default Auth;
