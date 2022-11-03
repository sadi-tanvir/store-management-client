import { useMutation } from '@apollo/client';
import React, { useState, useEffect, useRef } from 'react';
import Swal from "sweetalert2"
import { CREATE_BRAND_MUTATION } from '../../../../gql/mutations/brandMutation';
import { BrandModalPropsType, BrandCommonType, BrandSupplierType } from '../../../../types/dashboard/manageProducts.types';
import TextInputField from '../../../shared/components/TextInputField';
import { CrossIcon } from '../../../shared/icons/icons';



const CreateBrandModal = ({ modalId, header, products, suppliers }: BrandModalPropsType) => {
    // gql
    const [createBrandMutation, { data, loading, error }] = useMutation(CREATE_BRAND_MUTATION, {
        // refetchQueries: [GET_STOCKS],
    });


    // for supplier state
    const [selectedSupplier, setSelectedSupplier] = useState<BrandSupplierType[]>([])
    const [remainingSupplier, setRemainingSupplier] = useState<BrandSupplierType[]>([])
    const [supplierState, setSupplierState] = useState(false)
    // for product state
    const [selectedProducts, setSelectedProducts] = useState<BrandCommonType[]>([])
    const [remainingProducts, setRemainingProducts] = useState<BrandCommonType[]>([])
    const [productState, setProductState] = useState(false)
    // state
    const modalRef: React.MutableRefObject<any> = useRef()
    const [brand, setBrand] = useState({
        name: "",
        description: "",
        email: "",
        phone: "",
        website: "",
        location: "",
        products: [] as BrandCommonType[],
        suppliers: [] as BrandSupplierType[]
    })

    // handle text input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBrand({ ...brand, [name]: value })
    }

    // handle select supplier
    const handleSelectSupplier = (id: string) => {
        const select = suppliers.filter((supplier) => {
            return supplier._id === id
        })
        if (selectedSupplier.length > 0) {
            for (let i = 0; i < selectedSupplier.length; i++) {
                if (!selectedSupplier.includes(select[0])) {
                    setSelectedSupplier([...selectedSupplier, select[0]] as BrandSupplierType[])
                }
            }
        } else {
            setSelectedSupplier([...selectedSupplier, select[0]] as BrandSupplierType[])
        }
    }

    // handle remove from selected supplier
    const handleRemoveSupplier = (e: React.MouseEvent, id: string) => {
        e.stopPropagation()
        setSelectedSupplier(() => {
            return selectedSupplier.filter((supplier: BrandSupplierType) => {
                return supplier._id !== id
            })
        })
    }

    // handle select product
    const handleSelectProduct = (id: string) => {
        const select = products.filter((product) => {
            return product._id === id
        })
        if (selectedProducts.length > 0) {
            for (let i = 0; i < selectedProducts.length; i++) {
                if (!selectedProducts.includes(select[0])) {
                    setSelectedProducts([...selectedProducts, select[0]] as BrandCommonType[])
                }
            }
        } else {
            setSelectedProducts([...selectedProducts, select[0]] as BrandCommonType[])
        }
    }

    // handle remove from selected product
    const handleRemoveProduct = (e: React.MouseEvent, id: string) => {
        e.stopPropagation()
        setSelectedProducts(() => {
            return selectedProducts.filter((product: BrandCommonType) => {
                return product._id !== id
            })
        })
    }

    // update User
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const { productId, name, description, unit, imageUrl, price, quantity, status, categoryId, categoryName, brandId, brandName, supplierId, supplierName } = brand;
        const { name, description, email, phone, website, location, products, suppliers } = brand;
        Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#14b8a6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Create it!' })
            .then((result) => {
                if (result.isConfirmed) {
                    createBrandMutation({
                        variables: {
                            info: {
                                name, description, email, phone, website, location,
                                products: products.map(product => product._id),
                                suppliers: suppliers.map((supplier) => {
                                    return {
                                        name: supplier.name,
                                        email: supplier.email,
                                        phone: supplier.contactNumber,
                                        id: supplier._id
                                    }
                                })
                            }
                        }
                    })
                    Swal.fire('Created!', 'Your brand has been created.', 'success')
                        .then(() => {
                            modalRef.current.checked = false;
                        })
                }
            })
    }


    useEffect(() => {
        setRemainingSupplier(() => {
            return suppliers?.filter((supplier) => {
                return !selectedSupplier.includes(supplier)
            })
        })
        setRemainingProducts(() => {
            return products?.filter((product) => {
                return !selectedProducts.includes(product)
            })
        })

        setBrand({ ...brand, suppliers: selectedSupplier, products: selectedProducts })
    }, [selectedSupplier, suppliers, selectedProducts])

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
                            label="Brand Name"
                            name="name"
                            type="text"
                            placeholder="Brand Name"
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
                        <TextInputField
                            onChange={handleChange}
                            label="Email"
                            name="email"
                            type="text"
                            placeholder="Email"
                            className="input-sm sm:input-md"
                        />
                        <TextInputField
                            onChange={handleChange}
                            label="Phone"
                            name="phone"
                            type="number"
                            placeholder="Phone"
                            className="input-sm sm:input-md"
                        />
                        <TextInputField
                            onChange={handleChange}
                            label="Website"
                            name="website"
                            type="text"
                            placeholder="Website"
                            className="input-sm sm:input-md"
                        />
                        {/* <SelectInput
                            onChange={handleSelectChange}
                            label="Status"
                            name="status"
                            options="active inactive"
                            className="select-sm sm:select-md"
                        /> */}
                        <TextInputField
                            onChange={handleChange}
                            label="Location"
                            name="location"
                            type="text"
                            placeholder="Location"
                            className="input-sm sm:input-md"
                        />

                        {/* supplier select */}
                        <div className="mt-5 mx-auto flex flex-col gap-2 px-2 bg-white rounded-lg border border-gray-200 shadow-md justify-center items-center cursor-pointer">
                            <div onClick={() => setSupplierState(!supplierState)} className="my-3 w-full mx-auto flex flex-wrap gap-2 py-3 px-2 bg-white min-h-[50px] rounded-lg border border-gray-200 shadow-md justify-center items-center cursor-pointer">
                                {selectedSupplier.length <= 0 && <span className="bg-red-300 text-red-600 px-3 py-[1px] inline-block rounded-full border border-gray-200 shadow-sm">Click to add a supplier</span>}
                                {selectedSupplier.map((element: BrandSupplierType) =>
                                    <span key={element._id} className="flex justify-center items-center bg-teal-300 text-teal-600 px-3 py-[1px] inline-block rounded-full border border-gray-200 shadow-sm">
                                        {element.name}
                                        <CrossIcon onClick={(e: React.MouseEvent) => handleRemoveSupplier(e, element._id)} iconClass="w-5 h-5 ml-1" />
                                    </span>)}
                            </div>
                            <div className={`mb-2 ${!supplierState && "hidden"}`}>
                                {remainingSupplier?.map((supplier: BrandSupplierType) => {
                                    return <span key={supplier._id} onClick={() => handleSelectSupplier(supplier._id)} className="w-full my-1 bg-teal-300 text-teal-600 px-3 py-[1px] inline-block rounded-md border border-gray-200 shadow-md text-start">
                                        <span className="mr-1">{supplier.name}</span> /
                                        <span className="ml-1">{supplier.email}</span>
                                    </span>
                                })}
                            </div>
                        </div>

                        {/* product select */}
                        <div className="mt-5 mx-auto flex flex-col gap-2 px-2 bg-white rounded-lg border border-gray-200 shadow-md justify-center items-center cursor-pointer">
                            <div onClick={() => setProductState(!productState)} className="my-3 w-full mx-auto flex flex-wrap gap-2 py-3 px-2 bg-white min-h-[50px] rounded-lg border border-gray-200 shadow-md justify-center items-center cursor-pointer">
                                {selectedProducts.length <= 0 && <span className="bg-red-300 text-red-600 px-3 py-[1px] inline-block rounded-full border border-gray-200 shadow-sm">Click to add a product</span>}
                                {selectedProducts.map((product: BrandCommonType) =>
                                    <span key={product._id} className="flex justify-center items-center bg-teal-300 text-teal-600 px-3 py-[1px] inline-block rounded-full border border-gray-200 shadow-sm">
                                        {product.name}
                                        <CrossIcon onClick={(e: React.MouseEvent) => handleRemoveProduct(e, product._id)} iconClass="w-5 h-5 ml-1" />
                                    </span>)}
                            </div>
                            <div className={`mb-2 ${!productState && "hidden"}`}>
                                {remainingProducts?.map((product: BrandCommonType) => {
                                    return <span key={product._id} onClick={() => handleSelectProduct(product._id)} className="w-full my-1 bg-teal-300 text-teal-600 px-3 py-[1px] inline-block rounded-md border border-gray-200 shadow-md text-start">
                                        <span className="mr-1 flex justify-between items-center w-full">
                                            {product.name}
                                        </span>
                                    </span>
                                })}
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary text-teal-700 font-bold btn-sm sm:btn-md w-full mx-auto mt-5 px-5">CREATE</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateBrandModal;