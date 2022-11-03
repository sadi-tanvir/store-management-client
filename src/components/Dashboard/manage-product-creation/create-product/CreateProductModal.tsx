import { useMutation } from '@apollo/client';
import React, { useState, useRef, useEffect } from 'react';
import SelectInput from '../../../shared/components/SelectInput';
import TextInputField from '../../../shared/components/TextInputField';
import Swal from "sweetalert2"
import { BrandCommonType, CategoryCommonType, ProductModalPropsType } from '../../../../types/dashboard/manageProducts.types';
import { CREATE_PRODUCT_MUTATION } from '../../../../gql/mutations/productMutation';
import SingleSelectOption from '../../../shared/components/SingleSelectOption';


const CreateProductModal = ({ modalId, header, categories, brands }: ProductModalPropsType) => {
    // gql
    const [createProductMutation, { data, loading, error }] = useMutation(CREATE_PRODUCT_MUTATION, {
        // refetchQueries: [GET_STOCKS],
    });

    // for brand state
    const [remainingBrand, setRemainingBrand] = useState<BrandCommonType[]>([])
    const [brandVisibility, setBrandVisibility] = useState(false)

    // for brand state
    const [remainingCategory, setRemainingCategory] = useState<CategoryCommonType[]>([])
    const [categoryVisibility, setCategoryVisibility] = useState(false)
    // state
    const modalRef: React.MutableRefObject<any> = useRef()
    const [product, setProduct] = useState({
        name: "",
        description: "",
        unit: "",
        imageUrl: "",
        brand: {
            id: "",
            name: ""
        },
        category: {
            id: "",
            name: ""
        }
    })

    // handle text input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    // handle select input change
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    // handle select brand
    const handleSelectBrand = (id: string) => {
        const select = brands.filter((brand) => {
            return brand._id === id
        })
        setProduct({ ...product, brand: { id: select[0]["_id"], name: select[0]["name"] } })
    }

    // handle remove from selected product
    const handleRemoveBrand = (e: React.MouseEvent) => {
        e.stopPropagation()
        setProduct({ ...product, brand: { id: "", name: "" } })
    }

    // handle select category
    const handleSelectCategory = (id: string) => {
        const select = categories.filter((category) => {
            return category._id === id
        })
        setProduct({ ...product, category: { id: select[0]["_id"], name: select[0]["name"] } })
    }

    // handle remove from selected product
    const handleRemoveCategory = (e: React.MouseEvent) => {
        e.stopPropagation()
        setProduct({ ...product, category: { id: "", name: "" } })
    }

    // update User
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { name, description, unit, imageUrl, brand, category } = product;
        Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#14b8a6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Create it!' })
            .then((result) => {
                if (result.isConfirmed) {
                    createProductMutation({
                        variables: {
                            info: {
                                name, description, unit, imageUrl,
                                category: { id: category.id, name: category.name },
                                brand: { id: brand.id, name: brand.name },
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


    useEffect(() => {
        setRemainingBrand(() => {
            return brands?.filter((brand) => brand._id !== product.brand.id)
        })

        setRemainingCategory(() => {
            return categories?.filter((category) => category._id !== product.category.id)
        })
    }, [product, product.brand, brands, categories, product.category])

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

                        <SingleSelectOption
                            header="Click here to add a brand"
                            visibility={{
                                visibility: brandVisibility,
                                setVisibility: setBrandVisibility
                            }}
                            mainStateValue={{
                                id: product.brand.id,
                                name: product.brand.name
                            }}
                            remainingStateValue={remainingBrand}
                            handleRemoveValue={handleRemoveBrand}
                            handleSelectValue={handleSelectBrand}
                        />

                        <SingleSelectOption
                            header="Click here to add a category"
                            visibility={{
                                visibility: categoryVisibility,
                                setVisibility: setCategoryVisibility
                            }}
                            mainStateValue={{
                                id: product.category.id,
                                name: product.category.name
                            }}
                            remainingStateValue={remainingCategory}
                            handleRemoveValue={handleRemoveCategory}
                            handleSelectValue={handleSelectCategory}
                        />

                        <button type="submit" className="btn btn-primary text-teal-700 font-bold btn-sm sm:btn-md w-full mx-auto mt-5 px-5">CREATE</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateProductModal;