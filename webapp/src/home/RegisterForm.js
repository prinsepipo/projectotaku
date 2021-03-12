import React from 'react';

import FormBase from './components/FormBase';
import FormHeader from './components/FormHeader';
import FormError from './components/FormError';
import FormField from './components/FormField';
import FormButton from './components/FormButton';


class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            errors: [],
        };
        this.register = this.register.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    }

    render() {
        let formError = null;

        if (this.state.errors.length !== 0) {
            formError = <FormError errors={this.state.errors} />;
        }

        return (
            <FormBase onSubmit={this.register}>
                <FormHeader title='Sign Up' />
                {formError}
                <FormField type='text' fieldname='username' onChange={this.handleUsername} />
                <FormField type='password' fieldname='password' onChange={this.handlePassword} />
                <FormField
                  type='password'
                  fieldname='confirm password'
                  onChange={this.handleConfirmPassword}
                />
                <FormButton classType='primary' buttonType='submit' text='Sign Up' />
                <p>or</p>
                <FormButton
                  classType='secondary'
                  buttonType='button'
                  text='Sign In'
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

    handleConfirmPassword(event) {
        this.setState({
            confirmPassword: event.target.value,
        });
    }

    register(event) {
        event.preventDefault();

        this.validateFields();

        // Register using backend api.
    }

    validateFields() {
        let errors = [];

        if (this.state.username === '') {
            errors.push('Username is required.');
        }

        if (this.state.password === '') {
            errors.push('Password is required.');
        }

        if (this.state.confirmPassword === '') {
            errors.push('Confirm Password is required.');
        }

        this.setState({
            errors: errors,
        });
    }
}


export default RegisterForm;
