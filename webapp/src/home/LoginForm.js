import React from 'react';

import FormBase from './components/FormBase';
import FormHeader from './components/FormHeader';
import FormError from './components/FormError';
import FormField from './components/FormField';
import FormButton from './components/FormButton';


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: [],
        };
        this.login = this.login.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    render() {
        let formError = null;
        if (this.state.errors.length !== 0) {
            formError = <FormError errors={this.state.errors} />;
        }

        return (
            <FormBase onSubmit={this.login}>
                <FormHeader title='Sign In' />
                {formError}
                <FormField type='text' fieldname='username' onChange={this.handleUsername}
                />
                <FormField type='password' fieldname='password' onChange={this.handlePassword}
                />
                <FormButton classType='primary' buttonType='submit' text='Sign In' />
                <p>or</p>
                <FormButton
                  classType='secondary'
                  buttonType='button'
                  text='Sign Up'
                  onClick={this.props.swapForm}
                />
            </FormBase>
        );
    }

    handleUsername(event) {
        this.setState({
            username: event.target.value,
        });
    }

    handlePassword(event) {
        this.setState({
            password: event.target.value,
        });
    }

    login(event) {
        event.preventDefault();

        this.validateFields();

        // Login using the backend api.
    }

    validateFields() {
        let errors = [];

        if (this.state.username === '') {
            errors.push('Username is required.');
        }

        if (this.state.password === '') {
            errors.push('Password is required.');
        }

        this.setState({
            errors: errors,
        });
    }
}

export default LoginForm;
