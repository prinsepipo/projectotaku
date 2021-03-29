import React from 'react';
import { withRouter } from 'react-router-dom';

import UserContext from '../../context/UserContext';

import { watchlistAPI } from '../../utils/api';

import FormBase from './form/Form';
import FormHeader from './form/FormHeader';
import FormError from './form/FormErrorList';
import FormField from './form/FormField';
import FormButton from './form/FormButton';


class LoginForm extends React.Component {
    static contextType = UserContext;

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
            watchlistAPI.post('auth/login/', {
                username: this.state.username,
                password: this.state.password,
            })
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
        }
    }
}

export default withRouter(LoginForm);
