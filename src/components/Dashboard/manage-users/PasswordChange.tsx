import { useMutation } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { CHANGE_USER_PASSWORD } from '../../../gql/mutations/userAuthMutations';
import { GET_OWNER_PROFILE } from '../../../gql/queries/userAuthQueries';
import { useAppSelector } from '../../../redux/hooks/hooks';

const PasswordChange = () => {
    const { ownerInfo } = useAppSelector(state => state.authReducer);

    // state
    const [password, setPassword] = useState({
        oldPassword: '',
        newPassword: ''
    })

    // gql
    const [changeUserPassword, { data, loading, error }] = useMutation(CHANGE_USER_PASSWORD, {
        refetchQueries: [GET_OWNER_PROFILE],
    });

    // handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword({ ...password, [e.target.name]: e.target.value })
    }

    // update User password
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { oldPassword, newPassword } = password;
        Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#14b8a6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Update it!' })
            .then((result) => {
                if (result.isConfirmed) {
                    changeUserPassword({
                        variables: {
                            id: ownerInfo._id,
                            info: {
                                oldPassword,
                                newPassword
                            }
                        }
                    })
                }
            })
    }

    useEffect(() => {
        if (error) {
            Swal.fire('Failed!', error.message, 'error')
        } if (data) {
            Swal.fire('Updated!', data?.changeUserPassword?.message, 'success')
        }
    }, [error, data])
    return (
        <>
            <div className="w-full px-4 py-2">
                <details className="mb-4 cursor-pointer">
                    <summary className="font-semibold text-white bg-gray-500 rounded-md py-2 px-4">
                        Click Here to Change Your Password
                    </summary>

                    <div className="w-50 h-auto bg-slate-50 sm:rounded-3xl">
                        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-5">
                            <div className="max-w-full mx-auto">
                                <div className="divide-y divide-gray-200">
                                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                        <form onSubmit={handleSubmit}>
                                            <div className="relative">
                                                <input
                                                    onChange={handleChange}
                                                    autoComplete="off"
                                                    id="password"
                                                    name="oldPassword"
                                                    type="password"
                                                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address"
                                                />
                                                <label htmlFor="oldPassword" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Old Password</label>
                                            </div>
                                            <div className="relative mt-5">
                                                <input
                                                    onChange={handleChange}
                                                    autoComplete="off"
                                                    id="password"
                                                    name="newPassword"
                                                    type="password"
                                                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password"
                                                />
                                                <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">New Password</label>
                                            </div>
                                            <div className="relative mt-3">
                                                <button type="submit" className="bg-blue-500 text-white rounded-md px-2 py-1">Change Password</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </details>
            </div>
        </>
    );
};

export default PasswordChange;