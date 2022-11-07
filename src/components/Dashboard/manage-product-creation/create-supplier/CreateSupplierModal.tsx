import { useMutation } from '@apollo/client';
import React, { useState, useRef, useEffect } from 'react';
import SelectInput from '../../../shared/components/SelectInput';
import TextInputField from '../../../shared/components/TextInputField';
import Swal from "sweetalert2"
import DataListInputField from '../../../shared/components/DataListInputField';
import { ProductModalPropsType } from '../../../../types/dashboard/productCreation.types';
import { CREATE_PRODUCT_MUTATION } from '../../../../gql/mutations/productMutation';
import { CrossIcon } from '../../../shared/icons/icons';
import { CREATE_SUPPLIER_MUTATION } from '../../../../gql/mutations/supplierMutation';
import SingleSelectOption from '../../../shared/components/SingleSelectOption';

export type SupplierBrandType = {
    _id: string;
    name: string;
}
export type SupplierModalPropsType = {
    modalId: string;
    header: string;
    brands: SupplierBrandType[];
}

const CreateSupplierModal = ({ modalId, header, brands }: SupplierModalPropsType) => {
    // gql
    const [createSupplierMutation, { data, loading, error }] = useMutation(CREATE_SUPPLIER_MUTATION, {
        // refetchQueries: [GET_STOCKS],
    });

    // for brand state
    const [remainingBrand, setRemainingBrand] = useState<SupplierBrandType[]>([])
    const [brandVisibility, setBrandVisibility] = useState(false)

    // state
    const modalRef: React.MutableRefObject<any> = useRef()
    const [supplier, setSupplier] = useState({
        name: "",
        email: "",
        contactNumber: "",
        presentAddress: "",
        permanentAddress: "",
        imageUrl: "",
        brand: {
            name: "",
            id: ""
        }
    })

    // handle text input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSupplier({ ...supplier, [e.target.name]: e.target.value })
    }

    // handle select input change
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSupplier({ ...supplier, [e.target.name]: e.target.value })
    }

    // handle select brand
    const handleSelectBrand = (id: string) => {
        const select = brands.filter((brand) => {
            return brand._id === id
        })
        // setSelectedBrands(select[0])
        setSupplier({ ...supplier, brand: { id: select[0]["_id"], name: select[0]["name"] } })
    }

    // handle remove from selected product
    const handleRemoveBrand = (e: React.MouseEvent) => {
        e.stopPropagation()
        setSupplier({ ...supplier, brand: { id: "", name: "" } })
    }

    // update User
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { name, email, contactNumber, presentAddress, permanentAddress, imageUrl, brand } = supplier
        // const { name, description, unit, imageUrl, categoryId, categoryName, brandId, brandName } = product;
        Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#14b8a6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Create it!' })
            .then((result) => {
                if (result.isConfirmed) {
                    createSupplierMutation({
                        variables: {
                            info: { name, email, contactNumber, presentAddress, permanentAddress, imageUrl, brand }
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
            return brands?.filter((brand) => brand._id !== supplier.brand.id)
        })
    }, [supplier, supplier.brand, brands])

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
                            label="Name"
                            name="name"
                            type="text"
                            placeholder="Name"
                            className="input-sm sm:input-md"
                        />
                        <TextInputField
                            onChange={handleChange}
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            className="input-sm sm:input-md"
                        />
                        <TextInputField
                            onChange={handleChange}
                            label="Contact Number"
                            name="contactNumber"
                            type="number"
                            placeholder="Contact Number"
                            className="input-sm sm:input-md"
                        />
                        <TextInputField
                            onChange={handleChange}
                            label="Present Address"
                            name="presentAddress"
                            type="text"
                            placeholder="Present Address"
                            className="input-sm sm:input-md"
                        />
                        <TextInputField
                            onChange={handleChange}
                            label="Permanent Address"
                            name="permanentAddress"
                            type="text"
                            placeholder="Permanent Address"
                            className="input-sm sm:input-md"
                        />
                        <TextInputField
                            onChange={handleChange}
                            label="Image Url"
                            name="imageUrl"
                            type="text"
                            placeholder="Image Url"
                            className="input-sm sm:input-md"
                        />

                        {/* <div className="mt-5 mx-auto flex flex-col gap-2 px-2 bg-white rounded-lg border border-gray-200 shadow-md justify-center items-center cursor-pointer">
                            <div onClick={() => setBrandVisibility(!brandVisibility)} className="my-3 w-full mx-auto flex flex-wrap gap-2 py-3 px-2 bg-white min-h-[50px] rounded-lg border border-gray-200 shadow-md justify-center items-center cursor-pointer">
                                {supplier.brand.id === "" && <span className="bg-red-300 text-red-600 px-3 py-[1px] inline-block rounded-full border border-gray-200 shadow-sm">Click to add a brand</span>}
                                <span className={`${supplier.brand.id === "" && "hidden"} flex justify-center items-center bg-teal-300 text-teal-600 px-3 py-[1px] inline-block rounded-full border border-gray-200 shadow-sm`}>
                                    {supplier.brand.name}
                                    <CrossIcon onClick={(e: React.MouseEvent) => handleRemoveBrand(e)} iconClass="w-5 h-5 ml-1" />
                                </span>
                            </div>
                            <div className={`mb-2 ${!brandVisibility && "hidden"}`}>
                                {remainingBrand?.map((brand: SupplierBrandType) => {
                                    return <span key={brand._id} onClick={() => handleSelectBrand(brand._id)} className="w-full my-1 bg-teal-300 text-teal-600 px-3 py-[1px] inline-block rounded-md border border-gray-200 shadow-md text-start">
                                        <span className="mr-1 flex justify-between items-center w-full">
                                            {brand.name}
                                        </span>
                                    </span>
                                })}
                            </div>
                        </div> */}


                        <SingleSelectOption
                            header="Click here to add a brand"
                            visibility={{
                                visibility: brandVisibility,
                                setVisibility: setBrandVisibility
                            }}
                            mainStateValue={{
                                id: supplier.brand.id,
                                name: supplier.brand.name
                            }}
                            remainingStateValue={remainingBrand}
                            handleRemoveValue={handleRemoveBrand}
                            handleSelectValue={handleSelectBrand}
                        />

                        <button type="submit" className="btn btn-primary text-teal-700 font-bold btn-sm sm:btn-md w-full mx-auto mt-5 px-5">CREATE</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateSupplierModal;