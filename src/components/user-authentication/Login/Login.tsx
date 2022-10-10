import React from 'react';
import Form from '../Form';

const Login = () => {
    return (
        <>
            <Form
                title="Login"
                forgotPassword={true}
                dontHaveAccount={{ path: '/register', label: 'Don\'t have an account?' }}
            />
        </>
    );
};

export default Login;