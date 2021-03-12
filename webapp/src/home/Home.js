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
                <div className='Home-header flex-center'>
                    <h1 className='Home-title'>Project Otaku</h1>
                    <p className='Home-details'>Create and manage your anime and manga list.</p>
                </div>
                <div className='Form'>
                    <this.state.form swapForm={this.swapForm.bind(this)} />
                </div>
            </div>
        );
    }

    swapForm() {
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
