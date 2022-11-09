import { useMutation } from '@apollo/client';
import React, { useState, useRef } from 'react';
import Swal from "sweetalert2"
import { UPDATE_PRODUCT_MUTATION } from '../../../gql/mutations/productMutation';
import { UPDATE_SUPPLIER_MUTATION } from '../../../gql/mutations/supplierMutation';
import { GET_PRODUCTS_WITH_DETAILS } from '../../../gql/queries/productQueries';
import { GET_SUPPLIERS_WITH_DETAILS } from '../../../gql/queries/supplierQueries';
// import { ManageSupplierType } from '../../../pages/dashboard/mange-suppliers/ManageSuppliers';
import { UpdateProductModalPropsType } from '../../../types/dashboard/manageProduct.types';
import DataListInputField from '../../shared/components/DataListInputField';
import SelectInput from '../../shared/components/SelectInput';
import TextInputField from '../../shared/components/TextInputField';


export type UpdateSupplierModalPropsType = {
    modalId: string;
    header: string;
    currentSupplier: ManageSupplierType;
    brands: {
        _id: string;
        name: string;
    }[];
}

export type ManageSupplierType = {
    _id: string;
    name: string;
    email: string;
    contactNumber: string;
    presentAddress: string;
    permanentAddress: string;
    status: string;
    imageUrl: string;
    brand: {
        id: {
            _id: string;
            name: string;
        }
    }
}

const UpdateSupplierModal = ({ modalId, header, currentSupplier, brands }: UpdateSupplierModalPropsType) => {
    // gql
    const [updateSupplierMutation, { data, loading, error }] = useMutation(UPDATE_SUPPLIER_MUTATION, {
        refetchQueries: [GET_SUPPLIERS_WITH_DETAILS],
    });

    // state
    const modalRef: React.MutableRefObject<any> = useRef()
    const [supplier, setSupplier] = useState({
        _id: currentSupplier._id,
        name: currentSupplier.name,
        email: currentSupplier.email,
        contactNumber: currentSupplier.contactNumber,
        presentAddress: currentSupplier.presentAddress,
        permanentAddress: currentSupplier.permanentAddress,
        status: currentSupplier.status,
        imageUrl: currentSupplier.imageUrl,
        brandId: currentSupplier.brand.id._id,
        brandName: currentSupplier.brand.id.name
    })

    // handle text input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSupplier({ ...supplier, [name]: value })
    }
    // handle Select input change
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSupplier({ ...supplier, [name]: value })

    }


    // update User
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { _id, name, email, contactNumber, presentAddress, permanentAddress, status, imageUrl, brandId, brandName } = supplier;
        Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#14b8a6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Update it!' })
            .then((result) => {
                if (result.isConfirmed) {
                    updateSupplierMutation({
                        variables: {
                            id: _id,
                            info: {
                                name,
                                email,
                                contactNumber,
                                presentAddress,
                                permanentAddress,
                                status,
                                imageUrl,
                                brand: {
                                    id: brandId,
                                    name: brandName
                                }
                            }
                        }
                    })
                    Swal.fire('Updated!', 'Your product has been updated.', 'success')
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
                            value={supplier.name}
                            label="Supplier Name"
                            name="name"
                            type="text"
                            placeholder="Name"
                            className="input-sm sm:input-md"
                        />
                        <TextInputField
                            onChange={handleChange}
                            value={supplier.email}
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            className="input-sm sm:input-md"
                        />
                        <TextInputField
                            onChange={handleChange}
                            value={supplier.contactNumber}
                            label="Phone"
                            name="contactNumber"
                            type="text"
                            placeholder="Phone"
                            className="input-sm sm:input-md"
                        />
                        <TextInputField
                            onChange={handleChange}
                            value={supplier.presentAddress}
                            label="Present Address"
                            name="presentAddress"
                            type="text"
                            placeholder="Present Address"
                            className="input-sm sm:input-md"
                        />
                        <TextInputField
                            onChange={handleChange}
                            value={supplier.permanentAddress}
                            label="Permanent Address"
                            name="permanentAddress"
                            type="text"
                            placeholder="Permanent Address"
                            className="input-sm sm:input-md"
                        />
                        <SelectInput
                            onChange={handleSelectChange}
                            value={supplier.status}
                            label="Status"
                            name="status"
                            options="active inactive discontinued"
                            className="select-sm sm:select-md"
                        />
                        <TextInputField
                            onChange={handleChange}
                            value={supplier.imageUrl}
                            label="Image Url"
                            name="imageUrl"
                            type="text"
                            placeholder="Image Url"
                            className="input-sm sm:input-md"
                        />

                        <div className="form-control flex sm:flex-row justify-around items-center sm:space-x-2">
                            <DataListInputField
                                onChange={handleChange}
                                label="Brand Name"
                                name="brandName"
                                type="text"
                                placeholder="Brand Name"
                                className="input-sm sm:input-md"
                                dataListId='brandName'
                                value={supplier.brandName}
                                dataList={
                                    brands?.map((brand) => {
                                        return {
                                            value: brand?.name
                                        }
                                    })
                                }
                            />
                            <DataListInputField
                                onChange={handleChange}
                                label="Brand Id"
                                name="brandId"
                                type="text"
                                placeholder="Brand Id"
                                className="input-sm sm:input-md"
                                dataListId='brandId'
                                value={supplier.brandId}
                                dataList={
                                    brands?.map((brand) => {
                                        return {
                                            value: brand?._id,
                                            name: brand?.name
                                        }
                                    })
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

export default UpdateSupplierModal;