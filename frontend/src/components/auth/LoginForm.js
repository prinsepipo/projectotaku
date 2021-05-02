import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../../context/UserContext';

import axios from 'axios';

import FormBase from './form/Form';
import FormHeader from './form/FormHeader';
import FormError from './form/FormErrorList';
import FormField from './form/FormField';
import FormButton from './form/FormButton';


function LoginForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const {setIsAuthenticated} = useContext(UserContext);

    const history = useHistory();

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const validate = () => {
        let errors = [];

        if (username === '') {
            errors.push('Username is required.');
        }

        if (password === '') {
            errors.push('Password is required.');
        }

        setErrors(errors);

        return errors.length === 0;
    }

    const login = (event) => {
        event.preventDefault();

        let isValid = validate();

        if (isValid) {
            axios.post('/api/auth/login/', {
                username: username,
                password: password,
            })
                .then(response => {
                    localStorage.setItem('TOKEN', response.data.token);

                    setIsAuthenticated(true);

                    history.push('/watchlist');
                })
                .catch(error => {
                    if (error.response) {
                        let errors = [];

                        if (error.response.data.non_field_errors) {
                            errors.push(error.response.data.non_field_errors);
                        }

                        setErrors(errors);
                    } else {
                        // Handle error when request was sent but no response from the server.
                        history.push('/server-error');
                    }
                }
            );
        }
    }

    return (
        <FormBase onSubmit={login}>
            <FormHeader title='Sign In' />
            {errors.length !== 0 ? <FormError errors={errors} /> : null}
            <FormField
                type='text'
                fieldname='username'
                onChange={handleUsername}
            />
            <FormField
                type='password'
                fieldname='password'
                onChange={handlePassword}
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
                onClick={props.swapFormComponent}
            />
        </FormBase>
    );
}

export default LoginForm;
