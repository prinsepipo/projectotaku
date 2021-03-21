import React from 'react';

import api from '../../utils/api';

import FormBase from './form/Form';
import FormHeader from './form/FormHeader';
import FormError from './form/FormErrorList';
import FormField from './form/FormField';
import FormButton from './form/FormButton';


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: [],
        };
    }

    render() {
        return (
            <FormBase onSubmit={this.login}>
                <FormHeader title='Sign In' />
                {this.state.errors.length !== 0 ? <FormError errors={this.state.errors} /> : null}
                <FormField
                    type='text'
                    fieldname='username'
                    onChange={this.handleUsername}
                />
                <FormField
                    type='password'
                    fieldname='password'
                    onChange={this.handlePassword}
                />
                <FormButton
                    classType='primary'
                    buttonType='submit'
                    text='Sign In'
                />
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

    handleUsername = (event) => {
        this.setState({
            username: event.target.value,
        });
    }

    handlePassword = (event) => {
        this.setState({
            password: event.target.value,
        });
    }

    validate = () => {
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

        return errors.length === 0;
    }

    login = (event) => {
        event.preventDefault();

        let isValid = this.validate();

        if (isValid) {
            // Login using backend api.
            api.post('auth/login/', {
                username: this.state.username,
                password: this.state.password,
            })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    if (error.response) {
                        let errors = [];

                        if (error.response.data.non_field_errors) {
                            errors.push(error.response.data.non_field_errors);
                        }

                        this.setState({
                            errors: errors,
                        });
                    } else {
                        // Handle error when request was sent but no response from the server.
                    }
                });
        }
    }
}

export default LoginForm;
