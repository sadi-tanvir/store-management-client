import { useMutation } from '@apollo/client';
import React, { useState, useEffect, useRef } from 'react';
import Swal from "sweetalert2"
import { CREATE_BRAND_MUTATION } from '../../../../gql/mutations/brandMutation';
import { CREATE_CATEGORY_MUTATION } from '../../../../gql/mutations/categoryMutation';
import SelectInput from '../../../shared/components/SelectInput';
import TextInputField from '../../../shared/components/TextInputField';
import { CrossIcon, PlusIcon } from '../../../shared/icons/icons';


export type CategoryModalPropsType = {
    modalId: string;
    header: string;
}

const CreateCategoryModal = ({ modalId, header }: CategoryModalPropsType) => {
    // gql
    const [createCategoryMutation, { data, loading, error }] = useMutation(CREATE_CATEGORY_MUTATION, {
        // refetchQueries: [GET_STOCKS],
    });



    // state
    const modalRef: React.MutableRefObject<any> = useRef()
    const [category, setCategory] = useState({
        name: "",
        description: ""
    })

    // handle text input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCategory({ ...category, [name]: value })
    }


    // update User
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const { productId, name, description, unit, imageUrl, price, quantity, status, categoryId, categoryName, brandId, brandName, supplierId, supplierName } = brand;
        const { name, description } = category;
        Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#14b8a6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Create it!' })
            .then((result) => {
                if (result.isConfirmed) {
                    createCategoryMutation({
                        variables: {
                            info: {
                                name, description
                            }
                        }
                    })
                    Swal.fire('Created!', 'Your category has been created.', 'success')
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
                            label="Category Name"
                            name="name"
                            type="text"
                            placeholder="Category Name"
                            className="input-sm sm:input-md"
                        />
                        <TextInputField
                            onChange={handleChange}
                            label="Description"
                            name="description"
                            type="text"
                            placeholder="Category Description"
                            className="input-sm sm:input-md"
                        />

                        <button type="submit" className="btn btn-primary text-teal-700 font-bold btn-sm sm:btn-md w-full mx-auto mt-5 px-5">CREATE</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateCategoryModal;