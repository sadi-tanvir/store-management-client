import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { USER_LOGIN_MUTATION } from '../../../gql/mutations/userAuthMutations';
import Form from '../Form';

const Login = () => {
    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    // signIn mutation
    const [loginMutation, { data, loading, error }] = useMutation(USER_LOGIN_MUTATION);

    // handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    console.log(data);


    // handle form submit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        loginMutation({
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