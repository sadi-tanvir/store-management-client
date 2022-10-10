import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { LOGIN_USER_MUTATION } from '../../../gql/mutations/userAuthMutations';
import Form from '../Form';

const Login = () => {
    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    // signIn mutation
    const [loginReducer, { data, loading, error }] = useMutation(LOGIN_USER_MUTATION);

    // handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    console.log(data);


    // handle form submit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        loginReducer({
            variables: {
                info: {
                    email: user.email,
                    password: user.password
                }
            }
        })
    }

    return (
        <>
            <Form
                title="Login"
                forgotPassword={true}
                doesHaveAccount={{ path: '/register', label: 'Don\'t have an account?' }}
                onChange={(e) => handleChange(e)}
                handleSubmit={(e) => handleSubmit(e)}
            />
        </>
    );
};

export default Login;