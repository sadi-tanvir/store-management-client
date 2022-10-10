import React from 'react';
import Form from '../Form';

const Register = () => {
    return (
        <>
            <Form
                title="Register"
                nameField={true}
                doesHaveAccount={{ path: '/login', label: 'Don\'t have an account?' }}
            />
        </>
    );
};

export default Register;