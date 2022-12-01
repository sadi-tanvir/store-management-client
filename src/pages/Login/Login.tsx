import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { USER_LOGIN_MUTATION } from '../../gql/mutations/userAuthMutations';
import { useAppDispatch } from '../../redux/hooks/hooks';
import Form from '../../components/shared/components/Form';
import Swal from 'sweetalert2';

const Login = () => {
    const dispatch = useAppDispatch()

    // state
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
        // error notification
        if (error) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: false,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            Toast.fire({
                icon: 'error',
                title: 'Failed to Sign in'
            })
        }

        if (data?.signInUser?.status) {
            // success notification
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            Toast.fire({
                icon: 'success',
                title: 'Signed in successfully'
            })

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
    }, [data, dispatch, error])

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