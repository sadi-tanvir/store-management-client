import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { USER_LOGIN_MUTATION } from '../../gql/mutations/userAuthMutations';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import Form from '../../components/shared/components/Form';

const Login = () => {
    // const {  } = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch()

    // state
    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    // signIn mutation
    const [loginMutation, { data, loading, error }] = useMutation(USER_LOGIN_MUTATION);

    console.log(`login error`, error);
    console.log(`login data`, data);



    // handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }


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

    useEffect(() => {
        if (data?.signInUser?.status) {
            // update local storage
            localStorage.setItem('accessToken', JSON.stringify(data.signInUser.token));
            localStorage.setItem('darkMode', JSON.stringify(data.signInUser.user.darkMode));
            localStorage.setItem('role', JSON.stringify(data.signInUser.user.role));
            localStorage.setItem('accountStatus', JSON.stringify(data.signInUser.user.accountStatus));
            localStorage.setItem('ownerInfo', JSON.stringify(
                {
                    _id: data.signInUser.user._id,
                    firstName: data.signInUser.user.firstName,
                    lastName: data.signInUser.user.lastName,
                    email: data.signInUser.user.email,
                    phone: data.signInUser.user.phone,
                    image: data.signInUser.user.image,
                    gender: data.signInUser.user.gender,
                    currentAddress: data.signInUser.user.currentAddress,
                    permanentAddress: data.signInUser.user.permanentAddress,
                    dateOfBirth: data.signInUser.user.dateOfBirth,
                    createdAt: data.signInUser.user.createdAt,
                    updatedAt: data.signInUser.user.updatedAt,
                }
            ));

            // update redux store
            dispatch({ type: 'setOwnerInfo', payload: data.signInUser.user });
            dispatch({ type: 'loginUser' });
            dispatch({ type: 'accessToken', payload: data.signInUser.token });
            dispatch({ type: 'accountStatus', payload: data.signInUser.user.accountStatus });
            dispatch({ type: 'userRole', payload: data.signInUser.user.role });
            dispatch({ type: 'setDarkMode', payload: data.signInUser.user.darkMode });
            if (data.signInUser.user.role === "admin") {
                dispatch({ type: 'accessAdmin' });
            } else if (data.signInUser.user.role === 'manager') {
                dispatch({ type: 'accessManager' });
            } else if (data.signInUser.user.role === 'user') {
                dispatch({ type: 'accessUser' });
            }
        }
    }, [data, dispatch])

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