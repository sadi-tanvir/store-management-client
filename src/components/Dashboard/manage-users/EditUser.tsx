import { useMutation } from '@apollo/client';
import React, { useState, useEffect, useRef } from 'react';
import { USER_UPDATE_By_ADMIN_MUTATION } from '../../../gql/mutations/userAuthMutations';
import { GET_USER_BY_ID } from '../../../gql/queries/userAuthQueries';
import { useAppSelector } from '../../../redux/hooks/hooks';
import SelectInput from '../../shared/components/SelectInput';
import TextInputField from '../../shared/components/TextInputField';
import Swal from "sweetalert2"

const EditUser = () => {
    // gql
    const [editUserMutation, { data, loading, error }] = useMutation(USER_UPDATE_By_ADMIN_MUTATION, {
        refetchQueries: [GET_USER_BY_ID],
    });

    // redux
    const {
        _id, firstName, lastName, email, phone, role, accountStatus, gender, dateOfBirth, currentAddress, permanentAddress
    } = useAppSelector(state => state.userEditReducer);

    // state
    const [userInfo, setUserInfo] = useState({
        _id, firstName, lastName, email, phone, role, accountStatus, gender, dateOfBirth, currentAddress, permanentAddress
    });
    const modalRef: React.MutableRefObject<any> = useRef()


    // handle text input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    }

    // handle select input change
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    }

    // update User
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { _id, firstName, lastName, email, phone, role, accountStatus, gender, dateOfBirth, currentAddress, permanentAddress } = userInfo;
        // update User Information
        Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#14b8a6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Update it!' })
            .then((result) => {
                if (result.isConfirmed) {
                    editUserMutation({
                        variables: {
                            info: {
                                _id, firstName, lastName, email, phone, role, accountStatus, gender, dateOfBirth, currentAddress, permanentAddress
                            }
                        }
                    })
                    Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
                        .then(() => {
                            modalRef.current.checked = false;
                        })
                }
            })
    }

    useEffect(() => {
        setUserInfo({
            _id, firstName, lastName, email, phone, role, accountStatus, gender, dateOfBirth, currentAddress, permanentAddress
        })
    }, [_id])

    return (
        <>
            {/* Put this part before </body> tag */}
            <input ref={modalRef} type="checkbox" id="Edit-User-Modal" className="modal-toggle" />
            <div className="modal z-50">
                <div className="modal-box relative mt-14 px-5 sm:px-10">
                    <label htmlFor="Edit-User-Modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold mb-5">Edit Information</h3>

                    <form onSubmit={handleSubmit}>
                        <div className="form-control flex sm:flex-row justify-around">
                            <TextInputField
                                onChange={handleChange}
                                value={userInfo.firstName}
                                label="First Name"
                                name="firstName"
                                type="text"
                                placeholder="First Name"
                                className="input-sm sm:input-md"
                            />
                            <TextInputField
                                onChange={handleChange}
                                value={userInfo.lastName}
                                label="Last Name"
                                name="lastName"
                                type="text"
                                placeholder="Last Name"
                                className="input-sm sm:input-md"
                            />
                        </div>
                        <TextInputField
                            onChange={handleChange}
                            value={userInfo.email}
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="info@example.com"
                            className="input-sm sm:input-md"
                            rest={{
                                // readOnly: true,
                                autoComplete: "off"
                            }}
                        />
                        <TextInputField
                            onChange={handleChange}
                            value={userInfo.phone}
                            label="Phone"
                            name="phone"
                            type="number"
                            placeholder="password"
                            className="input-sm sm:input-md"
                        />

                        <div className="form-control flex sm:flex-row justify-around items-center sm:space-x-2">
                            <SelectInput
                                onChange={handleSelectChange}
                                value={userInfo.role}
                                label="Role"
                                name="role"
                                options="admin user manager"
                                className="select-sm sm:select-md"
                            />

                            <SelectInput
                                onChange={handleSelectChange}
                                value={userInfo.accountStatus}
                                label="Account Status"
                                name="accountStatus"
                                options="active inactive"
                                className="select-sm sm:select-md"
                            />
                            <SelectInput
                                onChange={handleSelectChange}
                                value={userInfo.gender}
                                label="Gender"
                                name="gender"
                                options="male female other N/A"
                                className="select-sm sm:select-md"
                            />
                        </div>
                        <TextInputField
                            onChange={handleChange}
                            value={userInfo.dateOfBirth}
                            label="Date Of Birth"
                            name="dateOfBirth"
                            type="text"
                            placeholder="Date Of Birth"
                            className="input-sm sm:input-md"
                        />
                        <TextInputField
                            onChange={handleChange}
                            value={userInfo.currentAddress}
                            label="Current Address"
                            name="currentAddress"
                            type="text"
                            placeholder="Current Address"
                            className="input-sm sm:input-md"
                        />
                        <TextInputField
                            onChange={handleChange}
                            value={userInfo.permanentAddress}
                            label="Permanent Address"
                            name="permanentAddress"
                            type="text"
                            placeholder="Permanent Address"
                            className="input-sm sm:input-md"
                        />
                        <button type="submit" className="btn btn-primary text-teal-700 font-bold btn-sm sm:btn-md w-full mx-auto mt-5 px-5">Update</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditUser;