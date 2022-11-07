import { useMutation } from '@apollo/client';
import React, { useState, useRef } from 'react';
import Swal from "sweetalert2"
import { UPDATE_BRAND_MUTATION } from '../../../gql/mutations/brandMutation';
import { GET_BRANDS } from '../../../gql/queries/brandQueries';
import { UpdateBrandModalPropsType } from '../../../types/dashboard/manageBrands.types';
import SelectInput from '../../shared/components/SelectInput';
import TextInputField from '../../shared/components/TextInputField';




const UpdateBrandModal = ({ modalId, header, currentBrand, products, suppliers }: UpdateBrandModalPropsType) => {
    // gql
    const [updateBrandMutation, { data, loading, error }] = useMutation(UPDATE_BRAND_MUTATION, {
        refetchQueries: [GET_BRANDS],
    });

    // state
    const modalRef: React.MutableRefObject<any> = useRef()
    const [brand, setBrand] = useState({
        _id: currentBrand._id,
        name: currentBrand.name,
        description: currentBrand.description,
        email: currentBrand.email,
        phone: currentBrand.phone,
        website: currentBrand.website,
        location: currentBrand.location,
        status: currentBrand.status
    })

    // handle text input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBrand({ ...brand, [name]: value })
    }
    // handle Select input change
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setBrand({ ...brand, [name]: value })
    }


    // update User
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { _id, name, description, email, phone, website, location, status } = brand;
        Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#14b8a6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Update it!' })
            .then((result) => {
                if (result.isConfirmed) {
                    updateBrandMutation({
                        variables: {
                            id: _id,
                            info: {
                                name,
                                description,
                                email,
                                phone,
                                website,
                                location,
                                status
                            }
                        }
                    })
                    Swal.fire('Updated!', 'Your brand has been updated.', 'success')
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
                            value={brand.name}
                            label="Brand Name"
                            name="name"
                            type="text"
                            placeholder="Brand Name"
                            className="input-sm sm:input-md"
                        />
                        <TextInputField
                            onChange={handleChange}
                            value={brand.description}
                            label="Description"
                            name="description"
                            type="text"
                            placeholder="Product Description"
                            className="input-sm sm:input-md"
                        />
                        <TextInputField
                            onChange={handleChange}
                            value={brand.email}
                            label="Email"
                            name="email"
                            type="text"
                            placeholder="Email"
                            className="input-sm sm:input-md"
                        />
                        <TextInputField
                            onChange={handleChange}
                            value={brand.phone}
                            label="Phone"
                            name="phone"
                            type="number"
                            placeholder="Phone"
                            className="input-sm sm:input-md"
                        />
                        <TextInputField
                            onChange={handleChange}
                            value={brand.website}
                            label="Website"
                            name="website"
                            type="text"
                            placeholder="Website"
                            className="input-sm sm:input-md"
                        />
                        <SelectInput
                            onChange={handleSelectChange}
                            value={brand.status}
                            label="Status"
                            name="status"
                            options="active inactive"
                            className="select-sm sm:select-md"
                        />
                        <TextInputField
                            onChange={handleChange}
                            value={brand.location}
                            label="Location"
                            name="location"
                            type="text"
                            placeholder="Location"
                            className="input-sm sm:input-md"
                        />

                        <button type="submit" className="btn btn-primary text-teal-700 font-bold btn-sm sm:btn-md w-full mx-auto mt-5 px-5">Update</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UpdateBrandModal;