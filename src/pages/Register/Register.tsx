import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { USER_REGISTER_MUTATION } from '../../gql/mutations/userAuthMutations';
import Form from '../../components/shared/components/Form';
import ReactHelmet from '../../components/shared/components/ReactHelmet';

const Register = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: ''
    })

    // signIn mutation
    const [registerMutation, { data, loading, error }] = useMutation(USER_REGISTER_MUTATION);

    // handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }


    // handle form submit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        registerMutation({
            variables: {
                info: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password,
                    phone: user.phone
                }
            }
        })
    }

    return (
        <>
            <ReactHelmet title={'Register - Store Management'} />
            <Form
                title="Register"
                nameField={true}
                phoneField={true}
                doesHaveAccount={{ path: '/login', label: 'Don\'t have an account?' }}
                onChange={(e) => handleChange(e)}
                handleSubmit={(e) => handleSubmit(e)}
            />
        </>
    );
};

export default Register;