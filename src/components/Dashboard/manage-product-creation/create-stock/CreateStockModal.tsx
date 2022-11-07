import { useMutation } from '@apollo/client';
import React, { useState, useRef, useEffect } from 'react';
import SelectInput from '../../../shared/components/SelectInput';
import TextInputField from '../../../shared/components/TextInputField';
import Swal from "sweetalert2"
import DataListInputField from '../../../shared/components/DataListInputField';
import { StockModalPropsType, StockProductType } from '../../../../types/dashboard/manageProducts.types';
import { CREATE_STOCK_MUTATION } from '../../../../gql/mutations/stockMutation';
import { GET_STOCKS } from '../../../../gql/queries/stockQueries';
import SingleSelectOption from '../../../shared/components/SingleSelectOption';


const CreateStockModal = ({ modalId, header, products, suppliers }: StockModalPropsType) => {

    // gql
    const [createStockMutation, { data, loading, error }] = useMutation(CREATE_STOCK_MUTATION, {
        refetchQueries: [GET_STOCKS],
    });

    // for brand state
    const [remainingProducts, setRemainingProducts] = useState<StockProductType[]>([])
    const [productVisibility, setProductVisibility] = useState(false)

    // state
    const modalRef: React.MutableRefObject<any> = useRef()
    const [stock, setStock] = useState({
        productInfo: {
            productId: "",
            name: "",
            imageUrl: "",
            brand: {
                id: "",
                name: ""
            },
            category: {
                id: "",
                name: ""
            }
        },
        productId: "",
        name: "",
        description: "",
        unit: "",
        status: "",
        imageUrl: "",
        price: "",
        quantity: "",
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

    // handle select product
    const handleSelectProduct = (id: string) => {
        const select = products.filter((product) => {
            return product._id === id
        })

        setStock({
            ...stock,
            productInfo: {
                productId: select[0]._id,
                name: select[0].name,
                imageUrl: select[0].imageUrl,
                brand: {
                    id: select[0].brand.id._id,
                    name: select[0].brand.id.name
                },
                category: {
                    id: select[0].category.id._id,
                    name: select[0].category.id.name
                }
            }
        })
    }

    // handle remove from selected product
    const handleRemoveProduct = (e: React.MouseEvent) => {
        e.stopPropagation()
        setStock({
            ...stock,
            productInfo: {
                productId: "",
                name: "",
                imageUrl: "",
                brand: {
                    id: "",
                    name: ""
                },
                category: {
                    id: "",
                    name: ""
                }
            }
        })
    }

    useEffect(() => {
        setRemainingProducts(() => {
            return products?.filter((product) => product._id !== stock.productInfo.productId)
        })
    }, [products, stock.productInfo.productId])

    // update User
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { productInfo, description, unit, price, quantity, status, supplierId, supplierName } = stock;
        const { productId, name, imageUrl, brand, category } = productInfo;
        Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#14b8a6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Create it!' })
            .then((result) => {
                if (result.isConfirmed) {
                    createStockMutation({
                        variables: {
                            info: {
                                productId,
                                name,
                                description,
                                unit,
                                imageUrl,
                                price: Number(price),
                                quantity: Number(quantity),
                                status,
                                category: { id: category.id, name: category.name },
                                brand: { id: brand.id, name: brand.name },
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
                        <SingleSelectOption
                            header="Add a product to create stock"
                            visibility={{
                                visibility: productVisibility,
                                setVisibility: setProductVisibility
                            }}
                            mainStateValue={{
                                id: stock.productInfo.productId,
                                name: stock.productInfo.name
                            }}
                            remainingStateValue={remainingProducts}
                            handleRemoveValue={handleRemoveProduct}
                            handleSelectValue={handleSelectProduct}
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