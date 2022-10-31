import { useMutation } from '@apollo/client';
import React, { useState, useEffect, useRef } from 'react';
import { USER_UPDATE_By_ADMIN_MUTATION } from '../../../../gql/mutations/userAuthMutations';
import { GET_USER_BY_ID } from '../../../../gql/queries/userAuthQueries';
import { useAppSelector } from '../../../../redux/hooks/hooks';
import SelectInput from '../../../shared/components/SelectInput';
import TextInputField from '../../../shared/components/TextInputField';
import Swal from "sweetalert2"
import DataListInputField from '../../../shared/components/DataListInputField';

const CreateProductModal = ({ modalId, header }: { modalId: string; header: string; }) => {


    // redux
    const { } = useAppSelector(state => state.userEditReducer);

    // state

    const modalRef: React.MutableRefObject<any> = useRef()


    // handle text input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    }

    // handle select input change
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

    }

    // update User
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#14b8a6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Update it!' })
            .then((result) => {
                if (result.isConfirmed) {
                    // editUserMutation({
                    //     variables: {
                    //         info: {
                    //             _id, firstName, lastName, email, phone, role, accountStatus, gender, dateOfBirth, currentAddress, permanentAddress
                    //         }
                    //     }
                    // })
                    Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
                        .then(() => {
                            modalRef.current.checked = false;
                        })
                }
            })
    }

    useEffect(() => {
        // setUserInfo({
        //     _id, firstName, lastName, email, phone, role, accountStatus, gender, dateOfBirth, currentAddress, permanentAddress
        // })
    }, [])

    return (
        <>
            {/* Put this part before </body> tag */}
            <input ref={modalRef} type="checkbox" id={modalId} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative px-5 sm:px-10">
                    <label htmlFor={modalId} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold mb-5">{header}</h3>

                    <form onSubmit={handleSubmit}>
                        <TextInputField
                            onChange={handleChange}
                            // value={userInfo.email}
                            label="Product Name"
                            name="productName"
                            type="text"
                            placeholder="Product Name"
                            className="input-sm sm:input-md"
                        />
                        <TextInputField
                            onChange={handleChange}
                            // value={userInfo.email}
                            label="Description"
                            name="productDescription"
                            type="text"
                            placeholder="Product Description"
                            className="input-sm sm:input-md"
                        />
                        <SelectInput
                            onChange={handleSelectChange}
                            // value={userInfo.role}
                            label="Unit Type"
                            name="unit"
                            options="kg litre pcs bag"
                            className="select-sm sm:select-md"
                        />
                        <TextInputField
                            onChange={handleChange}
                            // value={userInfo.email}
                            label="Image Url"
                            name="productImageUrl"
                            type="text"
                            placeholder="Product Image"
                            className="input-sm sm:input-md"
                        />
                        <div className="form-control flex sm:flex-row justify-around items-center sm:space-x-2">
                            <DataListInputField
                                onChange={handleChange}
                                // value={userInfo.email}
                                label="Category Name"
                                name="categoryName"
                                type="text"
                                placeholder="Category Name"
                                className="input-sm sm:input-md"
                                dataListId='categoryName'
                                dataList={
                                    [
                                        {
                                            value: "food",
                                        },
                                        {
                                            value: "medicine",
                                        }
                                    ]
                                }
                            />
                            <DataListInputField
                                onChange={handleChange}
                                // value={userInfo.email}
                                label="Category Id"
                                name="categoryId"
                                type="text"
                                placeholder="Category Id"
                                className="input-sm sm:input-md"
                                dataListId='categoryId'
                                dataList={
                                    [
                                        {
                                            value: "633f1a868429455fe441f661",
                                            name: "food"
                                        },
                                        {
                                            value: "633f1ab18429455fe441f664",
                                            name: "medicine"
                                        }
                                    ]
                                }
                            />
                        </div>

                        <div className="form-control flex sm:flex-row justify-around items-center sm:space-x-2">
                            <DataListInputField
                                onChange={handleChange}
                                // value={userInfo.email}
                                label="Brand Name"
                                name="brandName"
                                type="text"
                                placeholder="Brand Name"
                                className="input-sm sm:input-md"
                                dataListId='brandName'
                                dataList={
                                    [
                                        {
                                            value: "advanced chemical industries ltd."
                                        },
                                        {
                                            value: "advanced chemical industries ltd.-2"
                                        }
                                    ]
                                }
                            />
                            <DataListInputField
                                onChange={handleChange}
                                // value={userInfo.email}
                                label="Brand Id"
                                name="brandId"
                                type="text"
                                placeholder="Brand Id"
                                className="input-sm sm:input-md"
                                dataListId='brandId'
                                dataList={
                                    [
                                        {
                                            value: "633f1018c0c0bd5dd0bf9fee",
                                            name: "advanced chemical industries ltd."
                                        },
                                        {
                                            value: "633f132e3fbb2edae2fcedbf",
                                            name: "advanced chemical industries ltd.-2"
                                        }
                                    ]
                                }
                            />
                        </div>

                        <button type="submit" className="btn btn-primary text-teal-700 font-bold btn-sm sm:btn-md w-full mx-auto mt-5 px-5">Update</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateProductModal;