import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { DELETE_BRAND_MUTATION } from '../../../gql/mutations/brandMutation';
import { GET_BRANDS, GET_BRAND_BY_ID } from '../../../gql/queries/brandQueries';
import { GET_PRODUCTS_FOR_REFERENCES, GET_PRODUCTS_WITH_DETAILS } from '../../../gql/queries/productQueries';
import { GET_SUPPLIERS } from '../../../gql/queries/supplierQueries';
import { useAppDispatch } from '../../../redux/hooks/hooks';
import { ManageBrandType } from '../../../types/dashboard/manageBrands.types';
import TableHeader from "../../../components/shared/components/TableHeader";
import { BrandIcon, EmailIcon, EyesIcon, ProductIcon, TableDeleteIcon, TableEditIcon } from '../../../components/shared/icons/icons';
import BrandDetailsModal from '../../../components/Dashboard/manage-brands/BrandDetailsModal';
import UpdateBrandModal from '../../../components/Dashboard/manage-brands/UpdateBrandModal';
import ProductDetailsModal from '../../../components/Dashboard/mange-products/ProductDetailsModal';


export type ManageProductType = {
    _id: string;
    name: string;
    description: string;
    unit: string;
    imageUrl: string;
    category: {
        name: string;
    };
    brand: {
        name: string;
    };
}


const ManageProducts = () => {
    // gql
    const brandResponse = useQuery(GET_BRANDS);
    const supplierResponse = useQuery(GET_SUPPLIERS);
    const productResponse = useQuery(GET_PRODUCTS_WITH_DETAILS);
    const [getBrandByID, { loading, error, data, refetch }] = useLazyQuery(GET_BRAND_BY_ID);
    const [deleteBrandMutation] = useMutation(DELETE_BRAND_MUTATION, {
        refetchQueries: [GET_BRANDS],
    });

    // redux
    const dispatch = useAppDispatch();

    console.log(`from manage product`, productResponse?.data?.products);



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
                <TableHeader headers={["name", "brand", "description", "actions"]}>
                    {
                        productResponse?.data?.products.map((product: ManageProductType, index: number) => {
                            return (
                                <>
                                    <tr key={product._id}>
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="mr-2">
                                                    <ProductIcon iconClass="h-5 w-5 text-primary" />
                                                </div>
                                                <span className="font-medium">
                                                    {product.name.length > 15 ? `${product.name.substring(0, 15)}..` : product.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <div className="flex items-center">
                                                <div className="mr-2">
                                                    <BrandIcon iconClass="h-5 w-5 text-primary" />
                                                </div>
                                                <span>
                                                    {product.brand.name.length > 25 ? `${product.brand.name.substring(0, 10)} ...` : product.brand.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex items-center justify-start">
                                                <span>
                                                    {product.description.length > 25 ? `${product.description.substring(0, 10)} ...` : product.description}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="py-3 px-6 text-center">
                                            <div className="flex item-center justify-start">
                                                <div className="w-4 mr-2 cursor-pointer transform hover:text-primary hover:scale-110">
                                                    <label className="cursor-pointer" htmlFor={`details-${product._id}`}>
                                                        <EyesIcon />
                                                    </label>
                                                </div>
                                                <div className="w-4 mr-2 cursor-pointer transform hover:text-primary hover:scale-110">
                                                    <label onClick={() => handleEditBtn(product._id)} className="cursor-pointer" htmlFor={`update-${product._id}`}>
                                                        <TableEditIcon />
                                                    </label>
                                                </div>
                                                <div className="w-4 mr-2 cursor-pointer transform hover:text-red-500 hover:scale-110">
                                                    <label onClick={() => handleDeleteBrand(product._id)} className="cursor-pointer">
                                                        <TableDeleteIcon />
                                                    </label>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <ProductDetailsModal
                                        modalId={`details-${product._id}`}
                                        product={product}
                                    />
                                    <UpdateBrandModal
                                        header="Update Brand"
                                        modalId={`update-${product._id}`}
                                        currentBrand={product}
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

export default ManageProducts;