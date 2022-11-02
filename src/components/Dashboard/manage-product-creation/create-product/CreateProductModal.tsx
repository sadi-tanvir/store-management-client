import { useMutation } from '@apollo/client';
import React, { useState, useRef } from 'react';
import SelectInput from '../../../shared/components/SelectInput';
import TextInputField from '../../../shared/components/TextInputField';
import Swal from "sweetalert2"
import DataListInputField from '../../../shared/components/DataListInputField';
import { ProductModalPropsType } from '../../../../types/dashboard/manageProducts.types';
import { CREATE_PRODUCT_MUTATION } from '../../../../gql/mutations/productMutation';


const CreateProductModal = ({ modalId, header, categories, brands }: ProductModalPropsType) => {
    // gql
    const [createProductMutation, { data, loading, error }] = useMutation(CREATE_PRODUCT_MUTATION, {
        // refetchQueries: [GET_STOCKS],
    });

    // state
    const modalRef: React.MutableRefObject<any> = useRef()
    const [product, setProduct] = useState({
        name: "",
        description: "",
        unit: "",
        imageUrl: "",
        categoryName: "",
        categoryId: "",
        brandName: "",
        brandId: "",
    })

    // handle text input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    // handle select input change
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    // update User
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { name, description, unit, imageUrl, categoryId, categoryName, brandId, brandName } = product;
        Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#14b8a6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Create it!' })
            .then((result) => {
                if (result.isConfirmed) {
                    createProductMutation({
                        variables: {
                            info: {
                                name, description, unit, imageUrl,
                                category: { id: categoryId, name: categoryName },
                                brand: { id: brandId, name: brandName },
                            }
                        }
                    })
                    Swal.fire('Created!', 'Your product has been created.', 'success')
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
                            label="Product Name"
                            name="name"
                            type="text"
                            placeholder="Product Name"
                            className="input-sm sm:input-md"
                        />
                        <TextInputField
                            onChange={handleChange}
                            label="Description"
                            name="description"
                            type="text"
                            placeholder="Product Description"
                            className="input-sm sm:input-md"
                        />
                        <SelectInput
                            onChange={handleSelectChange}
                            label="Unit Type"
                            name="unit"
                            options="kg litre pcs bag"
                            className="select-sm sm:select-md"
                        />
                        <TextInputField
                            onChange={handleChange}
                            label="Image Url"
                            name="imageUrl"
                            type="text"
                            placeholder="Product Image"
                            className="input-sm sm:input-md"
                        />
                        <div className="form-control flex sm:flex-row justify-around items-center sm:space-x-2">
                            <DataListInputField
                                onChange={handleChange}
                                label="Category Name"
                                name="categoryName"
                                type="text"
                                placeholder="Category Name"
                                className="input-sm sm:input-md"
                                dataListId='categoryName'
                                dataList={
                                    categories?.map((category) => {
                                        return {
                                            value: category?.name
                                        }
                                    })
                                }
                            />
                            <DataListInputField
                                onChange={handleChange}
                                label="Category Id"
                                name="categoryId"
                                type="text"
                                placeholder="Category Id"
                                className="input-sm sm:input-md"
                                dataListId='categoryId'
                                dataList={
                                    categories?.map((category) => {
                                        return {
                                            value: category?._id,
                                            name: category?.name
                                        }
                                    })
                                }
                            />
                        </div>

                        <div className="form-control flex sm:flex-row justify-around items-center sm:space-x-2">
                            <DataListInputField
                                onChange={handleChange}
                                label="Brand Name"
                                name="brandName"
                                type="text"
                                placeholder="Brand Name"
                                className="input-sm sm:input-md"
                                dataListId='brandName'
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

                        <button type="submit" className="btn btn-primary text-teal-700 font-bold btn-sm sm:btn-md w-full mx-auto mt-5 px-5">CREATE</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateProductModal;