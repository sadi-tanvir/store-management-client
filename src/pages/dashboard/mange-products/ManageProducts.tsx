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
import Breadcrumbs from '../../../components/shared/components/Breadcrumbs';
import ReactHelmet from '../../../components/shared/components/ReactHelmet';





const ManageProducts = () => {
    // gql
    const brandResponse = useQuery(GET_BRANDS_2);
    const productResponse = useQuery(GET_PRODUCTS_WITH_DETAILS);
    const categoryResponse = useQuery(GET_CATEGORIES);
    const [deleteProductMutation] = useMutation(DELETE_PRODUCT_MUTATION, {
        refetchQueries: [GET_PRODUCTS_WITH_DETAILS],
    });

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

    return (
        <>
            <div className="px-5">
                <Breadcrumbs firstPath="/dashboard" firstName="Dashboard" current="Manage Products" />
                <ReactHelmet title={'Manage Products'} />
            </div>

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
                                                    <img
                                                        className="w-8 h-8 rounded-full shadow-lg mr-2"
                                                        src={product.imageUrl}
                                                        alt="User"
                                                    />
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
                                                <span className='text-sm font-semibold'>
                                                    {product?.brand?.id?.name.length > 25 ? `${product.brand.id.name.substring(0, 10)} ...` : product?.brand?.id?.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex items-center justify-start">
                                                <span className='text-sm font-semibold'>
                                                    {product?.description.length > 25 ? `${product?.description.substring(0, 10)} ...` : product?.description}
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
                                                    <label className="cursor-pointer" htmlFor={`update-${product._id}`}>
                                                        <TableEditIcon />
                                                    </label>
                                                </div>
                                                <div className="w-4 mr-2 cursor-pointer transform hover:text-red-500 hover:scale-110">
                                                    <label onClick={() => handleDeleteProduct(product._id)} className="cursor-pointer">
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
                                    <UpdateProductModal
                                        header="Update Product"
                                        modalId={`update-${product._id}`}
                                        currentProduct={product}
                                        categories={categoryResponse?.data?.categories}
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

export default ManageProducts;