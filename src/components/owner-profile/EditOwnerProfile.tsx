import { useMutation } from '@apollo/client';
import React, { useState, useEffect, useRef } from 'react';
import Swal from "sweetalert2"
import { UPDATE_OWNER_PROFILE } from '../../gql/mutations/userAuthMutations';
import { GET_OWNER_PROFILE } from '../../gql/queries/userAuthQueries';
import { useAppSelector } from '../../redux/hooks/hooks';
import SelectInput from '../shared/components/SelectInput';
import TextInputField from '../shared/components/TextInputField';

const EditOwnerProfile = () => {
    // gql
    const [editOwnerMutation, { data, loading, error }] = useMutation(UPDATE_OWNER_PROFILE, {
        refetchQueries: [GET_OWNER_PROFILE],
    });

    // redux
    const { isAdmin } = useAppSelector(state => state.authReducer);
    const {
        _id, firstName, lastName, email, phone, role, accountStatus, gender, dateOfBirth, currentAddress, permanentAddress
    } = useAppSelector(state => state.userEditReducer);

    // state
    const [ownerInfo, setOwnerInfo] = useState({
        _id, firstName, lastName, email, phone, role, accountStatus, gender, dateOfBirth, currentAddress, permanentAddress
    });
    const modalRef: React.MutableRefObject<any> = useRef()


    // handle text input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setOwnerInfo({ ...ownerInfo, [name]: value });
    }

    // handle select input change
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setOwnerInfo({ ...ownerInfo, [name]: value });
    }

    // update User
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { _id, firstName, lastName, email, phone, role, accountStatus, gender, dateOfBirth, currentAddress, permanentAddress } = ownerInfo;

        // update User Information
        Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#14b8a6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Update it!' })
            .then((result) => {
                if (result.isConfirmed) {
                    editOwnerMutation({
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
        setOwnerInfo({
            _id, firstName, lastName, email, phone, role, accountStatus, gender, dateOfBirth, currentAddress, permanentAddress
        })
    }, [_id])


    return (
        <>
            {/* Put this part before </body> tag */}
            <input ref={modalRef} type="checkbox" id="Edit-sadi-Modal" className="modal-toggle" />
            <div className="modal z-50 mt-14">
                <div className="modal-box relative px-5 sm:px-10">
                    <label htmlFor="Edit-sadi-Modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold mb-5">Edit Information</h3>

                    <form onSubmit={handleSubmit}>
                        <div className="form-control flex sm:flex-row justify-around">
                            <TextInputField
                                onChange={handleChange}
                                value={ownerInfo.firstName}
                                label="First Name"
                                name="firstName"
                                type="text"
                                placeholder="First Name"
                                className="input-sm sm:input-md"
                            />
                            <TextInputField
                                onChange={handleChange}
                                value={ownerInfo.lastName}
                                label="Last Name"
                                name="lastName"
                                type="text"
                                placeholder="Last Name"
                                className="input-sm sm:input-md"
                            />
                        </div>
                        <TextInputField
                            onChange={handleChange}
                            value={ownerInfo.email}
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="info@example.com"
                            className="input-sm sm:input-md"
                            rest={{
                                // readOnly: isAdmin ? false : true,
                                disabled: isAdmin ? false : true,
                                autoComplete: "off"
                            }}
                        />
                        <TextInputField
                            onChange={handleChange}
                            value={ownerInfo.phone}
                            label="Phone"
                            name="phone"
                            type="number"
                            placeholder="password"
                            className="input-sm sm:input-md"
                        />

                        <div className="form-control flex sm:flex-row justify-around items-center sm:space-x-2">
                            {isAdmin && <SelectInput
                                onChange={handleSelectChange}
                                value={ownerInfo.role}
                                label="Role"
                                name="role"
                                options="admin user manager"
                                className="select-sm sm:select-md"
                            />}

                            <SelectInput
                                onChange={handleSelectChange}
                                value={ownerInfo.accountStatus}
                                label="Account Status"
                                name="accountStatus"
                                options="active inactive"
                                className="select-sm sm:select-md"
                            />
                            <SelectInput
                                onChange={handleSelectChange}
                                value={ownerInfo.gender}
                                label="Gender"
                                name="gender"
                                options="male female other N/A"
                                className="select-sm sm:select-md"
                            />
                        </div>
                        <TextInputField
                            onChange={handleChange}
                            value={ownerInfo.dateOfBirth}
                            label="Date Of Birth"
                            name="dateOfBirth"
                            type="text"
                            placeholder="Date Of Birth"
                            className="input-sm sm:input-md"
                        />
                        <TextInputField
                            onChange={handleChange}
                            value={ownerInfo.currentAddress}
                            label="Current Address"
                            name="currentAddress"
                            type="text"
                            placeholder="Current Address"
                            className="input-sm sm:input-md"
                        />
                        <TextInputField
                            onChange={handleChange}
                            value={ownerInfo.permanentAddress}
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

export default EditOwnerProfile
    ;