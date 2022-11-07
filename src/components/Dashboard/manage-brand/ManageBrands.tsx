import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { DELETE_BRAND_MUTATION } from '../../../gql/mutations/brandMutation';
import { GET_BRANDS, GET_BRAND_BY_ID } from '../../../gql/queries/brandQueries';
import { GET_PRODUCTS_FOR_REFERENCES } from '../../../gql/queries/productQueries';
import { GET_SUPPLIERS } from '../../../gql/queries/supplierQueries';
import { useAppDispatch } from '../../../redux/hooks/hooks';
import TableHeader from "../../shared/components/TableHeader";
import { BrandIcon, EmailIcon, EyesIcon, TableDeleteIcon, TableEditIcon } from '../../shared/icons/icons';
import BrandDetailsModal from './BrandDetailsModal';
import UpdateBrandModal from './UpdateBrandModal';


export type ManageBrandType = {
    _id: string;
    name: string;
    description: string;
    email: string;
    phone: string;
    website: string;
    status: string;
    location: string;
    products: {
        _id: string;
        name: string;
    }[];
    suppliers: {
        id: {
            name: string;
            imageUrl: string
        };
    }[];
}

const ManageBrands = () => {
    // gql
    const brandResponse = useQuery(GET_BRANDS);
    const supplierResponse = useQuery(GET_SUPPLIERS);
    const productResponse = useQuery(GET_PRODUCTS_FOR_REFERENCES);
    const [getBrandByID, { loading, error, data, refetch }] = useLazyQuery(GET_BRAND_BY_ID);
    const [deleteBrandMutation] = useMutation(DELETE_BRAND_MUTATION, {
        refetchQueries: [GET_BRANDS],
    });

    // redux
    const dispatch = useAppDispatch();


    // handle Delete Brand
    const handleDeleteBrand = (id: string) => {
        Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#14b8a6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Delete it!' })
            .then((result) => {
                if (result.isConfirmed) {
                    deleteBrandMutation({
                        variables: {
                            id: id
                        }
                    })
                }
            })
    }

    const handleEditBtn = (id: string) => {
        getBrandByID({
            variables: {
                id: id
            }
        })
    }

    useEffect(() => {
        if (data?.getBrandWithId) {
            dispatch({ type: 'setBrandEdit', payload: data?.getBrandWithId });
        }
    }, [data?.getBrandWithId])


    return (
        <>
            <div className="w-full">
                <TableHeader headers={["name", "email", "suppliers", "status", "actions"]}>
                    {
                        brandResponse?.data?.brandsWithReference.map((brand: ManageBrandType, index: number) => {
                            return (
                                <>
                                    <tr key={brand._id}>
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="mr-2">
                                                    <BrandIcon iconClass="h-5 w-5 text-primary" />
                                                </div>
                                                <span className="font-medium">
                                                    {brand.name.length > 15 ? `${brand.name.substring(0, 15)}..` : brand.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <div className="flex items-center">
                                                <div className="mr-2">
                                                    <EmailIcon iconClass="h-5 w-5 text-primary" />
                                                </div>
                                                <span>
                                                    {brand.email.length > 25 ? `${brand.email.substring(0, 10)} ... @${brand.email.split('@')[1]}` : brand.email}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex items-center justify-center">
                                                {brand?.suppliers?.map((supplier: any, index: any) => {

                                                    return <img key={index + 1} className="w-6 h-6 rounded-full border-gray-200 border transform hover:scale-125" src={supplier?.id?.imageUrl} />
                                                })}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <span className="bg-teal-200 text-teal-600 py-1 px-3 rounded-full text-xs">Active</span>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex item-center justify-center">
                                                <div className="w-4 mr-2 cursor-pointer transform hover:text-primary hover:scale-110">
                                                    <label className="cursor-pointer" htmlFor={`details-${brand._id}`}>
                                                        <EyesIcon />
                                                    </label>
                                                </div>
                                                <div className="w-4 mr-2 cursor-pointer transform hover:text-primary hover:scale-110">
                                                    <label onClick={() => handleEditBtn(brand._id)} className="cursor-pointer" htmlFor={`update-${brand._id}`}>
                                                        <TableEditIcon />
                                                    </label>
                                                </div>
                                                <div className="w-4 mr-2 cursor-pointer transform hover:text-red-500 hover:scale-110">
                                                    <label onClick={() => handleDeleteBrand(brand._id)} className="cursor-pointer">
                                                        <TableDeleteIcon />
                                                    </label>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <BrandDetailsModal
                                        modalId={`details-${brand._id}`}
                                        brand={brand}
                                    />
                                    <UpdateBrandModal
                                        header="Update Brand"
                                        modalId={`update-${brand._id}`}
                                        currentBrand={brand}
                                        products={productResponse?.data?.products}
                                        suppliers={supplierResponse?.data?.suppliers?.map((supplier: any) => {
                                            return {
                                                id: supplier._id,
                                                name: supplier.name,
                                                email: supplier.email,
                                                phone: supplier.contactNumber,
                                            }
                                        })}
                                    />
                                </>
                            )
                        })
                    }

                </TableHeader>
            </div >



        </>
    );
};

export default ManageBrands;