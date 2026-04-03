import { useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../../context/UserContext';

import axios from 'axios';

import FormBase from './form/Form';
import FormHeader from './form/FormHeader';
import FormError from './form/FormErrorList';
import FormField from './form/FormField';
import FormButton from './form/FormButton';


function RegisterForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const {setIsAuthenticated} = useContext(UserContext);

    const history = useHistory();


    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    }

    const validate = () => {
        let errors = [];

        if (username === '') {
            errors.push('Username is required.');
        }

        if (password === '') {
            errors.push('Password is required.');
        }

        if (confirmPassword === '') {
            errors.push('Confirm Password is required.');
        }

        if (password && confirmPassword && password !== confirmPassword) {
            errors.push('Passwords didn\'t match.');
        }

        setErrors(errors);

        return errors.length === 0;
    }

    const register = (event) => {
        event.preventDefault();

        let isValid = validate();

        if (isValid) {
            const data = {
                username: username,
                password: password,
            }

            // Register then login user if successful.
            axios.post('/api/auth/register/', data)
                .then(response => {
                    axios.post('/api/auth/login/', data)
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
                })
                .catch(error => {
                    if (error.response) {
                        let errors = [];

                        if (error.response.data.username) {
                            errors.push(error.response.data.username);
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
        <FormBase onSubmit={register}>
            <FormHeader title='Sign Up' />
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
            <FormField
                type='password'
                fieldname='confirm password'
                onChange={handleConfirmPassword}
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
                onClick={props.swapFormComponent}
            />
        </FormBase>
    );
}


export default RegisterForm;
