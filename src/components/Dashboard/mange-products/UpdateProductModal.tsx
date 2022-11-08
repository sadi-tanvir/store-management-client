import { useMutation } from '@apollo/client';
import React, { useState, useRef } from 'react';
import Swal from "sweetalert2"
import { UPDATE_PRODUCT_MUTATION } from '../../../gql/mutations/productMutation';
import { GET_PRODUCTS_WITH_DETAILS } from '../../../gql/queries/productQueries';
import { UpdateProductModalPropsType } from '../../../types/dashboard/manageProduct.types';
import DataListInputField from '../../shared/components/DataListInputField';
import SelectInput from '../../shared/components/SelectInput';
import TextInputField from '../../shared/components/TextInputField';




const UpdateProductModal = ({ modalId, header, currentProduct, categories, brands }: UpdateProductModalPropsType) => {
    // gql
    const [updateProductMutation, { data, loading, error }] = useMutation(UPDATE_PRODUCT_MUTATION, {
        refetchQueries: [GET_PRODUCTS_WITH_DETAILS],
    });

    // state
    const modalRef: React.MutableRefObject<any> = useRef()
    const [product, setProduct] = useState({
        _id: currentProduct._id,
        name: currentProduct.name,
        description: currentProduct.description,
        imageUrl: currentProduct.imageUrl,
        unit: currentProduct.unit,
        categoryId: currentProduct.category.id._id,
        categoryName: currentProduct.category.id.name,
        brandId: currentProduct.brand.id._id,
        brandName: currentProduct.brand.id.name,
    })

    // handle text input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value })
    }
    // handle Select input change
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value })

    }


    // update User
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { _id, name, description, unit, imageUrl, categoryName, categoryId, brandId, brandName } = product;
        Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#14b8a6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Update it!' })
            .then((result) => {
                if (result.isConfirmed) {
                    updateProductMutation({
                        variables: {
                            id: _id,
                            info: {
                                name,
                                description,
                                unit,
                                imageUrl,
                                category: {
                                    id: categoryId,
                                    name: categoryName
                                },
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
                            value={product.name}
                            label="Product Name"
                            name="name"
                            type="text"
                            placeholder="Product Name"
                            className="input-sm sm:input-md"
                        />
                        <TextInputField
                            onChange={handleChange}
                            value={product.description}
                            label="Description"
                            name="description"
                            type="text"
                            placeholder="Product Description"
                            className="input-sm sm:input-md"
                        />
                        <TextInputField
                            onChange={handleChange}
                            value={product.imageUrl}
                            label="Image Url"
                            name="imageUrl"
                            type="text"
                            placeholder="Image Url"
                            className="input-sm sm:input-md"
                        />
                        <SelectInput
                            onChange={handleSelectChange}
                            value={product.unit}
                            label="Unit Type"
                            name="unit"
                            options="kg litre pcs bag"
                            className="select-sm sm:select-md"
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
                                value={product.categoryName}
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
                                value={product.categoryId}
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
                                value={product.brandName}
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
                                value={product.brandId}
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

export default UpdateProductModal;