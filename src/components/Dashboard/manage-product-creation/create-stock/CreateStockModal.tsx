import { useMutation } from '@apollo/client';
import React, { useState, useEffect, useRef } from 'react';
import { USER_UPDATE_By_ADMIN_MUTATION } from '../../../../gql/mutations/userAuthMutations';
import { GET_USER_BY_ID } from '../../../../gql/queries/userAuthQueries';
import { useAppSelector } from '../../../../redux/hooks/hooks';
import SelectInput from '../../../shared/components/SelectInput';
import TextInputField from '../../../shared/components/TextInputField';
import Swal from "sweetalert2"
import DataListInputField from '../../../shared/components/DataListInputField';
import { StockModalPropsType } from '../../../../types/dashboard/manageProducts.types';
import { CREATE_STOCK_MUTATION } from '../../../../gql/mutations/stockMutation';
import { GET_STOCKS } from '../../../../gql/queries/stockQueries';


const CreateStockModal = ({ modalId, header, products, categories, brands, suppliers }: StockModalPropsType) => {
    // gql
    const [createStockMutation, { data, loading, error }] = useMutation(CREATE_STOCK_MUTATION, {
        refetchQueries: [GET_STOCKS],
    });

    // state
    const modalRef: React.MutableRefObject<any> = useRef()
    const [stock, setStock] = useState({
        productId: "",
        name: "",
        description: "",
        unit: "",
        status: "",
        imageUrl: "",
        price: "",
        quantity: "",
        categoryName: "",
        categoryId: "",
        brandName: "",
        brandId: "",
        supplierName: "",
        supplierId: "",
    })


    // handle text input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setStock({ ...stock, [name]: value })
    }

    // handle select input change
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setStock({ ...stock, [name]: value })
    }

    // update User
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { productId, name, description, unit, imageUrl, price, quantity, status, categoryId, categoryName, brandId, brandName, supplierId, supplierName } = stock;
        Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#14b8a6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Create it!' })
            .then((result) => {
                if (result.isConfirmed) {
                    createStockMutation({
                        variables: {
                            info: {
                                productId, name, description, unit, imageUrl, price: Number(price), quantity: Number(quantity), status,
                                category: { id: categoryId, name: categoryName },
                                brand: { id: brandId, name: brandName },
                                suppliedBy: { id: supplierId, name: supplierName }
                            }
                        }
                    })
                    Swal.fire('Created!', 'Your stock has been created.', 'success')
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
                        <DataListInputField
                            onChange={handleChange}
                            label="Product Id"
                            name="productId"
                            type="text"
                            placeholder="product id"
                            className="input-sm sm:input-md"
                            dataListId='productId'
                            dataList={products?.map((product) => {
                                return {
                                    value: product._id,
                                    name: product.name
                                }
                            })}
                        />
                        <DataListInputField
                            onChange={handleChange}
                            label="Product Name"
                            name="name"
                            type="text"
                            placeholder="product Name"
                            className="input-sm sm:input-md"
                            dataListId='name'
                            dataList={products?.map((product) => {
                                return {
                                    value: product.name,
                                    name: product.brand.name
                                }
                            })}
                        />
                        <TextInputField
                            onChange={handleChange}
                            label="Description"
                            name="description"
                            type="text"
                            placeholder="Product Description"
                            className="input-sm sm:input-md"
                        />
                        <div className="form-control flex sm:flex-row justify-around items-center sm:space-x-2">
                            <SelectInput
                                onChange={handleSelectChange}
                                label="Unit Type"
                                name="unit"
                                options="kg litre pcs bag"
                                className="select-sm sm:select-md"
                            />
                            <SelectInput
                                onChange={handleSelectChange}
                                label="Stock Status"
                                name="status"
                                options="in-stock out-of-stock discontinued"
                                className="select-sm sm:select-md"
                            />
                        </div>

                        <DataListInputField
                            onChange={handleChange}
                            label="Image Url"
                            name="imageUrl"
                            type="text"
                            placeholder="Product Image Url"
                            className="input-sm sm:input-md"
                            dataListId='imageUrl'
                            dataList={
                                products?.map((product) => {
                                    return {
                                        value: product?.imageUrl,
                                        name: product?.name
                                    }
                                })
                            }
                        />

                        <TextInputField
                            onChange={handleChange}
                            label="Price"
                            name="price"
                            type="number"
                            placeholder="Product Price"
                            className="input-sm sm:input-md"
                        />

                        <TextInputField
                            onChange={handleChange}
                            label="Quantity"
                            name="quantity"
                            type="number"
                            placeholder="Product Quantity"
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

                        <div className="form-control flex sm:flex-row justify-around items-center sm:space-x-2">
                            <DataListInputField
                                onChange={handleChange}
                                label="Supplier Name"
                                name="supplierName"
                                type="text"
                                placeholder="Supplier Name"
                                className="input-sm sm:input-md"
                                dataListId='supplierName'
                                dataList={
                                    suppliers?.map((supplier) => {
                                        return {
                                            value: supplier?.name
                                        }
                                    })
                                }
                            />
                            <DataListInputField
                                onChange={handleChange}
                                label="Supplier Id"
                                name="supplierId"
                                type="text"
                                placeholder="Supplier Id"
                                className="input-sm sm:input-md"
                                dataListId='supplierId'
                                dataList={
                                    suppliers?.map((supplier) => {
                                        return {
                                            value: supplier?._id,
                                            name: supplier?.name
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

export default CreateStockModal;