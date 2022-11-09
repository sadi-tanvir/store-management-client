import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { GET_BRANDS_2, GET_BRAND_BY_ID } from '../../../gql/queries/brandQueries';
import { GET_PRODUCTS_WITH_DETAILS } from '../../../gql/queries/productQueries';
import { useAppDispatch } from '../../../redux/hooks/hooks';
import TableHeader from "../../../components/shared/components/TableHeader";
import { BrandIcon, EyesIcon, TableDeleteIcon, TableEditIcon } from '../../../components/shared/icons/icons';
import ProductDetailsModal from '../../../components/Dashboard/mange-products/ProductDetailsModal';
import UpdateProductModal from '../../../components/Dashboard/mange-products/UpdateProductModal';
import { GET_CATEGORIES } from '../../../gql/queries/categoryQueries';
import { DELETE_PRODUCT_MUTATION } from '../../../gql/mutations/productMutation';
import { ManageProductType } from '../../../types/dashboard/manageProduct.types';
import { GET_SUPPLIERS_WITH_DETAILS } from '../../../gql/queries/supplierQueries';
import { DELETE_SUPPLIER_MUTATION } from '../../../gql/mutations/supplierMutation';
import UpdateSupplierModal from '../../../components/Dashboard/mange-suppliers/UpdateSupplierModal';


export type ManageSupplierType = {
    _id: string;
    name: string;
    email: string;
    contactNumber: string;
    presentAddress: string;
    permanentAddress: string;
    status: string;
    imageUrl: string;
    brand: {
        id: {
            _id: string;
            name: string;
        }
    }
}


const ManageSuppliers = () => {
    // gql
    const brandResponse = useQuery(GET_BRANDS_2);
    const supplierResponse = useQuery(GET_SUPPLIERS_WITH_DETAILS);
    // const categoryResponse = useQuery(GET_CATEGORIES);
    const [getBrandByID, { loading, error, data, refetch }] = useLazyQuery(GET_BRAND_BY_ID);
    const [deleteSupplierMutation] = useMutation(DELETE_SUPPLIER_MUTATION, {
        refetchQueries: [GET_SUPPLIERS_WITH_DETAILS],
    });

    // redux
    const dispatch = useAppDispatch();


    // handle Delete Brand
    const handleDeleteSupplier = (id: string) => {
        Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#14b8a6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Delete it!' })
            .then((result) => {
                if (result.isConfirmed) {
                    deleteSupplierMutation({
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
                <TableHeader headers={["name", "phone", "brand", "status", "actions"]}>
                    {
                        supplierResponse?.data?.suppliers.map((supplier: ManageSupplierType, index: number) => {
                            return (
                                <>
                                    <tr key={supplier._id}>
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="mr-2">
                                                    <img
                                                        className="w-8 h-8 rounded-full shadow-lg mr-2"
                                                        src={supplier.imageUrl}
                                                        alt="User"
                                                    />
                                                </div>
                                                <span className="font-medium flex flex-col justify-start">
                                                    {supplier.name.length > 15 ? `${supplier.name.substring(0, 15)}..` : supplier.name}
                                                    <br />
                                                    <span>
                                                        {supplier.email.length > 15 ? `${supplier.email.substring(0, 15)}..` : supplier.email}
                                                    </span>
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <div className="flex items-center">
                                                <div className="mr-2">
                                                    <BrandIcon iconClass="h-5 w-5 text-primary" />
                                                </div>
                                                <span className='text-sm font-semibold'>
                                                    {supplier.contactNumber.length > 12 ? `${supplier.contactNumber.substring(0, 10)} ...` : supplier.contactNumber}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex items-center justify-start">
                                                <span className='text-sm font-semibold'>
                                                    {supplier.brand.id.name.length > 25 ? `${supplier.brand.id.name.substring(0, 10)} ...` : supplier.brand.id.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex items-center justify-start">
                                                <span className={`${supplier.status === 'active' ? 'bg-teal-200 text-teal-600' : 'bg-red-200 text-red-600'} font-semibold py-1 px-3 rounded-full text-xs`}>
                                                    {supplier.status}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="py-3 px-6 text-center">
                                            <div className="flex item-center justify-start">
                                                <div className="w-4 mr-2 cursor-pointer transform hover:text-primary hover:scale-110">
                                                    <label className="cursor-pointer" htmlFor={`details-${supplier._id}`}>
                                                        <EyesIcon />
                                                    </label>
                                                </div>
                                                <div className="w-4 mr-2 cursor-pointer transform hover:text-primary hover:scale-110">
                                                    <label onClick={() => handleEditBtn(supplier._id)} className="cursor-pointer" htmlFor={`update-${supplier._id}`}>
                                                        <TableEditIcon />
                                                    </label>
                                                </div>
                                                <div className="w-4 mr-2 cursor-pointer transform hover:text-red-500 hover:scale-110">
                                                    <label onClick={() => handleDeleteSupplier(supplier._id)} className="cursor-pointer">
                                                        <TableDeleteIcon />
                                                    </label>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    {/* <ProductDetailsModal
                                        modalId={`details-${supplier._id}`}
                                        supplier={supplier}
                                    /> */}
                                    <UpdateSupplierModal
                                        header="Update Supplier"
                                        modalId={`update-${supplier._id}`}
                                        currentSupplier={supplier}
                                        brands={brandResponse?.data?.brands}
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

export default ManageSuppliers;