// UpdateProductModal
import { useMutation } from '@apollo/client';
import React, { useState, useRef } from 'react';
import Swal from "sweetalert2"
import { UPDATE_CATEGORY_MUTATION } from '../../../gql/mutations/categoryMutation';
import { ManageCategoryType } from '../../../pages/dashboard/manage-categories/ManageCategories';
import TextInputField from '../../shared/components/TextInputField';
import { GET_CATEGORIES } from "../../../gql/queries/categoryQueries";


export type UpdateCategoryModalPropsType = {
    modalId: string;
    header: string;
    currentCategory: ManageCategoryType;
}


const UpdateCategoryModal = ({ modalId, header, currentCategory }: UpdateCategoryModalPropsType) => {
    // gql
    const [updateCategoryMutation, { data, loading, error }] = useMutation(UPDATE_CATEGORY_MUTATION, {
        refetchQueries: [GET_CATEGORIES],
    });

    // state
    const modalRef: React.MutableRefObject<any> = useRef()
    const [category, setProduct] = useState({
        _id: currentCategory._id,
        name: currentCategory.name,
        description: currentCategory.description
    })

    // handle text input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct({ ...category, [name]: value })
    }


    // update User
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { _id, name, description } = category;
        Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#14b8a6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Update it!' })
            .then((result) => {
                if (result.isConfirmed) {
                    updateCategoryMutation({
                        variables: {
                            id: _id,
                            info: {
                                name,
                                description
                            }
                        }
                    })
                    Swal.fire('Updated!', 'Your category has been updated.', 'success')
                        .then(() => {
                            modalRef.current.checked = false;
                        })
                }
            })
    }


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
                            value={category.name}
                            label="Product Name"
                            name="name"
                            type="text"
                            placeholder="Product Name"
                            className="input-sm sm:input-md"
                        />
                        <TextInputField
                            onChange={handleChange}
                            value={category.description}
                            label="Description"
                            name="description"
                            type="text"
                            placeholder="Product Description"
                            className="input-sm sm:input-md"
                        />
                        <button type="submit" className="btn btn-primary text-teal-700 font-bold btn-sm sm:btn-md w-full mx-auto mt-5 px-5">Update</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UpdateCategoryModal;