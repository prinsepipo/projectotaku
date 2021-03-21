import React from 'react';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import './Home.css';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: LoginForm,
        };
    }

    render() {
        return (
            <div className='Home'>
                <div className='HomeHeader'>
                    <h1 className='HomeHeader-title'>Project Otaku</h1>
                    <p className='HomeHeader-details'>Create and manage your anime and manga list.</p>
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


export default Home;
