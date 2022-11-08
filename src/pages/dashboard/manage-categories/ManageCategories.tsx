import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { GET_BRANDS_2, GET_BRAND_BY_ID } from '../../../gql/queries/brandQueries';
import { GET_PRODUCTS_WITH_DETAILS } from '../../../gql/queries/productQueries';
import { useAppDispatch } from '../../../redux/hooks/hooks';
import TableHeader from "../../../components/shared/components/TableHeader";
import { BrandIcon, CategoryIcon, EyesIcon, TableDeleteIcon, TableEditIcon } from '../../../components/shared/icons/icons';
import ProductDetailsModal from '../../../components/Dashboard/mange-products/ProductDetailsModal';
import UpdateProductModal from '../../../components/Dashboard/mange-products/UpdateProductModal';
import { GET_CATEGORIES } from '../../../gql/queries/categoryQueries';
import { DELETE_PRODUCT_MUTATION } from '../../../gql/mutations/productMutation';
import CategoryDetailsModal from '../../../components/Dashboard/manage-categories/CategoryDetailsModal';


export type ManageCategoryType = {
    _id: string;
    name: string;
    description: string;
}

const ManageCategories = () => {
    // gql
    const brandResponse = useQuery(GET_BRANDS_2);
    const productResponse = useQuery(GET_PRODUCTS_WITH_DETAILS);
    const categoryResponse = useQuery(GET_CATEGORIES);
    const [getBrandByID, { loading, error, data, refetch }] = useLazyQuery(GET_BRAND_BY_ID);
    const [deleteProductMutation] = useMutation(DELETE_PRODUCT_MUTATION, {
        refetchQueries: [GET_PRODUCTS_WITH_DETAILS],
    });

    // redux
    const dispatch = useAppDispatch();

    console.log(categoryResponse?.data?.categories);


    // handle Delete Brand
    const handleDeleteProduct = (id: string) => {
        Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#14b8a6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Delete it!' })
            .then((result) => {
                if (result.isConfirmed) {
                    deleteProductMutation({
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
                <TableHeader headers={["name", "description", "actions"]}>
                    {categoryResponse?.data?.categories.map((category: ManageCategoryType, index: number) => {
                        return (
                            <>
                                <tr key={category._id}>
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="mr-2">
                                                <CategoryIcon iconClass="h-5 w-5 text-primary" />
                                            </div>
                                            <span className="font-medium">
                                                {category.name.length > 15 ? `${category.name.substring(0, 15)}..` : category.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <div className="flex items-center">
                                            <div className="mr-2">
                                                <BrandIcon iconClass="h-5 w-5 text-primary" />
                                            </div>
                                            <span>
                                                {category.description.length > 25 ? `${category.description.substring(0, 10)} ...` : category.description}
                                            </span>
                                        </div>
                                    </td>


                                    <td className="py-3 px-6 text-center">
                                        <div className="flex item-center justify-start">
                                            <div className="w-4 mr-2 cursor-pointer transform hover:text-primary hover:scale-110">
                                                <label className="cursor-pointer" htmlFor={`details-${category._id}`}>
                                                    <EyesIcon />
                                                </label>
                                            </div>
                                            <div className="w-4 mr-2 cursor-pointer transform hover:text-primary hover:scale-110">
                                                <label onClick={() => handleEditBtn(category._id)} className="cursor-pointer" htmlFor={`update-${category._id}`}>
                                                    <TableEditIcon />
                                                </label>
                                            </div>
                                            <div className="w-4 mr-2 cursor-pointer transform hover:text-red-500 hover:scale-110">
                                                <label onClick={() => handleDeleteProduct(category._id)} className="cursor-pointer">
                                                    <TableDeleteIcon />
                                                </label>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <CategoryDetailsModal
                                    modalId={`details-${category._id}`}
                                    category={category}
                                />
                                {/* <UpdateProductModal
                                    header="Update Product"
                                    modalId={`update-${product._id}`}
                                    currentProduct={product}
                                    categories={categoryResponse?.data?.categories}
                                    brands={brandResponse?.data?.brands}
                                /> */}
                            </>
                        )
                    })
                    }

                </TableHeader>
            </div >
        </>
    );
};

export default ManageCategories;