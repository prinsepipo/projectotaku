import React from 'react';
import { withRouter } from 'react-router-dom';

import UserContext from '../../context/UserContext';

import { watchlistAPI } from '../../utils/api';

import FormBase from './form/Form';
import FormHeader from './form/FormHeader';
import FormError from './form/FormErrorList';
import FormField from './form/FormField';
import FormButton from './form/FormButton';


class RegisterForm extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            errors: [],
        };
    }

    render() {
        return (
            <FormBase onSubmit={this.register}>
                <FormHeader title='Sign Up' />
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
                <FormField
                    type='password'
                    fieldname='confirm password'
                    onChange={this.handleConfirmPassword}
                />
                <FormButton
                    classType='primary'
                    buttonType='submit'
                    text='Sign Up'
                />
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

    handleConfirmPassword = (event) => {
        this.setState({
            confirmPassword: event.target.value,
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

        if (this.state.confirmPassword === '') {
            errors.push('Confirm Password is required.');
        }

        if (this.state.password !== this.state.confirmPassword) {
            errors.push('Passwords didn\'t match.');
        }

        this.setState({
            errors: errors,
        });

        return errors.length === 0;
    }

    register = (event) => {
        event.preventDefault();

        let isValid = this.validate();

        if (isValid) {
            const data = {
                username: this.state.username,
                password: this.state.password,
            }

            watchlistAPI.post('auth/register/', data)
                .then(response => {
                    // After registering, automatically login the user to
                    // remove extra step of loggin in.
                    watchlistAPI.post('auth/login/', data)
                        .then(response => {
                            localStorage.setItem('TOKEN', response.data.token);

                            this.context.setIsAuthenticated(() => true);

                            this.props.history.push('/watchlist');
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
                                this.props.history.push('/server-error');
                            }
                        }
                    );
                })
                .catch(error => {
                    if (error.response) {
                        let errors = [];

                        if (error.response.data.username) {
                            errors.push(error.response.data.username);
                        }

                        this.setState({
                            errors: errors,
                        });
                    } else {
                        // Handle error when request was sent but no response from the server.
                        this.props.history.push('/server-error');
                    }
                }
            );
        }
    }
}


export default withRouter(RegisterForm);
