import { useMutation } from '@apollo/client';
import React, { useState, useRef } from 'react';
import Swal from "sweetalert2"
import { UPDATE_STOCK_MUTATION } from '../../../gql/mutations/stockMutation';
import { GET_STOCKS, GET_STOCKS_WITH_DETAILS } from '../../../gql/queries/stockQueries';
import { UpdateStockModalPropsType } from '../../../types/dashboard/manageStocks.types';
import DataListInputField from '../../shared/components/DataListInputField';
import SelectInput from '../../shared/components/SelectInput';
import TextInputField from '../../shared/components/TextInputField';



const UpdateStockModal = ({ modalId, header, currentStock, categories, brands, suppliers }: UpdateStockModalPropsType) => {
    // gql
    const [updateStockMutation, { data, loading, error }] = useMutation(UPDATE_STOCK_MUTATION, {
        refetchQueries: [GET_STOCKS, GET_STOCKS_WITH_DETAILS],
    });

    // state
    const modalRef: React.MutableRefObject<any> = useRef()
    const [stock, setStock] = useState({
        _id: currentStock._id,
        name: currentStock.name,
        description: currentStock.description,
        price: currentStock.price,
        imageUrl: currentStock.imageUrl,
        status: currentStock.status,
        unit: currentStock.unit,
        quantity: currentStock.quantity,
        sellCount: currentStock.sellCount,
        categoryId: currentStock.category.id._id,
        categoryName: currentStock.category.id.name,
        brandId: currentStock.brand.id._id,
        brandName: currentStock.brand.id.name,
        supplierId: currentStock.suppliedBy.id._id,
        supplierName: currentStock.suppliedBy.id.name,
    })

    // handle text input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setStock({ ...stock, [name]: value })
    }
    // handle Select input change
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setStock({ ...stock, [name]: value })

    }


    // update User
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { _id, name, description, price, imageUrl, status, unit, quantity, sellCount, categoryName, categoryId, brandId, brandName, supplierId, supplierName } = stock;
        Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#14b8a6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Update it!' })
            .then((result) => {
                if (result.isConfirmed) {
                    updateStockMutation({
                        variables: {
                            id: _id,
                            info: {
                                name,
                                description,
                                price: Number(price),
                                imageUrl,
                                status,
                                unit,
                                quantity: Number(quantity),
                                sellCount: Number(sellCount),
                                category: {
                                    id: categoryId,
                                    name: categoryName
                                },
                                brand: {
                                    id: brandId,
                                    name: brandName
                                },
                                suppliedBy: {
                                    id: supplierId,
                                    name: supplierName
                                }
                            }
                        }
                    })
                    Swal.fire('Updated!', 'Your stock has been updated.', 'success')
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
                            value={stock.name}
                            label="Product Name"
                            name="name"
                            type="text"
                            placeholder="Product Name"
                            className="input-sm sm:input-md"
                        />
                        <TextInputField
                            onChange={handleChange}
                            value={stock.description}
                            label="Description"
                            name="description"
                            type="text"
                            placeholder="Product Description"
                            className="input-sm sm:input-md"
                        />
                        <TextInputField
                            onChange={handleChange}
                            value={stock.price}
                            label="price"
                            name="price"
                            type="number"
                            placeholder="price"
                            className="input-sm sm:input-md"
                        />
                        <TextInputField
                            onChange={handleChange}
                            value={stock.imageUrl}
                            label="Image Url"
                            name="imageUrl"
                            type="text"
                            placeholder="Image Url"
                            className="input-sm sm:input-md"
                        />
                        <div className="form-control flex sm:flex-row justify-between items-center sm:space-x-2">
                            <TextInputField
                                onChange={handleChange}
                                value={stock.quantity}
                                label="Available Quantity"
                                name="quantity"
                                type="number"
                                placeholder="Available Quantity"
                                className="input-sm sm:input-md"
                            />
                            <TextInputField
                                onChange={handleChange}
                                value={stock.sellCount}
                                label="Total Sell"
                                name="sellCount"
                                type="number"
                                placeholder="Sell Count"
                                className="input-sm sm:input-md"
                            />
                        </div>
                        <div className="form-control flex sm:flex-row justify-around items-center sm:space-x-2">
                            <SelectInput
                                onChange={handleSelectChange}
                                value={stock.status}
                                label="Status"
                                name="status"
                                options="kg litre pcs bag"
                                className="select-sm sm:select-md"
                            />
                            <SelectInput
                                onChange={handleSelectChange}
                                value={stock.unit}
                                label="Unit Type"
                                name="unit"
                                options="kg litre pcs bag"
                                className="select-sm sm:select-md"
                            />
                        </div>
                        <div className="form-control flex sm:flex-row justify-around items-center sm:space-x-2">
                            <DataListInputField
                                onChange={handleChange}
                                label="Category Name"
                                name="categoryName"
                                type="text"
                                placeholder="Category Name"
                                className="input-sm sm:input-md"
                                dataListId='categoryName'
                                value={stock.categoryName}
                                dataList={
                                    categories?.map((category) => {
                                        return {
                                            value: category?.name
                                        }
                                    })}
                            />
                            <DataListInputField
                                onChange={handleChange}
                                label="Category Id"
                                name="categoryId"
                                type="text"
                                placeholder="Category Id"
                                className="input-sm sm:input-md"
                                dataListId='categoryId'
                                value={stock.categoryId}
                                dataList={
                                    categories?.map((category) => {
                                        return {
                                            value: category?.id,
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
                                value={stock.brandName}
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
                                value={stock.brandId}
                                dataList={
                                    brands?.map((brand) => {
                                        return {
                                            value: brand?.id,
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
                                value={stock.supplierName}
                                dataList={
                                    suppliers?.map((supplier) => {
                                        return {
                                            value: supplier?.name
                                        }
                                    })}
                            />
                            <DataListInputField
                                onChange={handleChange}
                                label="Supplier Id"
                                name="supplierId"
                                type="text"
                                placeholder="Supplier Id"
                                className="input-sm sm:input-md"
                                dataListId='supplierId'
                                value={stock.supplierId}
                                dataList={
                                    suppliers?.map((supplier) => {
                                        return {
                                            value: supplier?.id,
                                            name: supplier?.name
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

export default UpdateStockModal;