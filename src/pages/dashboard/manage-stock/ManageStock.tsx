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
import { GET_STOCKS, GET_STOCKS_WITH_DETAILS } from '../../../gql/queries/stockQueries';
import { DELETE_STOCK_MUTATION } from '../../../gql/mutations/stockMutation';
import StockDetailsModal from '../../../components/Dashboard/manage-stock/StockDetailsModal';

export type StockCommonType = {
    id: {
        _id: string;
        name: string;
    }
}

export type ManageStockType = {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    status: string;
    unit: string;
    quantity: number;
    sellCount: number;
    category: StockCommonType;
    brand: StockCommonType;
    suppliedBy: StockCommonType;
}



const ManageStock = () => {
    // gql
    const brandResponse = useQuery(GET_BRANDS_2);
    const productResponse = useQuery(GET_PRODUCTS_WITH_DETAILS);
    const stockResponse = useQuery(GET_STOCKS_WITH_DETAILS);
    const categoryResponse = useQuery(GET_CATEGORIES);
    const [getBrandByID, { loading, error, data, refetch }] = useLazyQuery(GET_BRAND_BY_ID);
    const [deleteStockMutation] = useMutation(DELETE_STOCK_MUTATION, {
        refetchQueries: [GET_STOCKS_WITH_DETAILS, GET_STOCKS],
    });

    // redux
    const dispatch = useAppDispatch();

    console.log(`stockResponse`, stockResponse?.data?.getStocksWithDetails);


    // handle Delete Stock
    const handleDeleteStock = (id: string) => {
        Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#14b8a6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Delete it!' })
            .then((result) => {
                if (result.isConfirmed) {
                    deleteStockMutation({
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
                <TableHeader headers={["name", "quantity", "sell Count", "category", "actions"]}>
                    {
                        stockResponse?.data?.getStocksWithDetails?.map((stock: ManageStockType, index: number) => {
                            return (
                                <>
                                    <tr key={stock._id}>
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="mr-2">
                                                    <img
                                                        className="w-8 h-8 rounded-full shadow-lg mr-2"
                                                        src={stock.imageUrl}
                                                        alt="User"
                                                    />
                                                </div>
                                                <span className="font-medium flex flex-col justify-start">
                                                    {stock.name.length > 15 ? `${stock.name.substring(0, 15)}..` : stock.name}
                                                    <br />
                                                    <span>
                                                        {stock.description.length > 15 ? `${stock.description.substring(0, 15)}..` : stock.description}
                                                    </span>
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <div className="flex items-center">
                                                {/* <div className="mr-2">
                                                    <BrandIcon iconClass="h-5 w-5 text-primary" />
                                                </div> */}
                                                <span className={`${stock.quantity <= 0 ? 'bg-red-200 text-red-600' : 'bg-teal-200 text-teal-600'}  font-semibold rounded-full border border-gray-200 shadow-sm dark:bg-darkSecondary dark:border-gray-700 px-3 flex items-center py-[1px] cursor-pointer`}>
                                                    {stock.quantity} {stock.unit}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex items-center justify-start">
                                                <span className='bg-teal-200 text-teal-600 font-semibold rounded-full border border-gray-200 shadow-sm dark:bg-darkSecondary dark:border-gray-700 px-3 flex items-center py-[1px] cursor-pointer'>
                                                    {stock.sellCount} {stock.unit}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex items-center justify-start">
                                                <span className='bg-teal-200 text-teal-600 font-semibold rounded-full border border-gray-200 shadow-sm dark:bg-darkSecondary dark:border-gray-700 px-3 flex items-center py-[2px] cursor-pointer'>
                                                    {stock.category.id.name}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="py-3 px-6 text-center">
                                            <div className="flex item-center justify-start">
                                                <div className="w-4 mr-2 cursor-pointer transform hover:text-primary hover:scale-110">
                                                    <label className="cursor-pointer" htmlFor={`details-${stock._id}`}>
                                                        <EyesIcon />
                                                    </label>
                                                </div>
                                                <div className="w-4 mr-2 cursor-pointer transform hover:text-primary hover:scale-110">
                                                    <label onClick={() => handleEditBtn(stock._id)} className="cursor-pointer" htmlFor={`update-${stock._id}`}>
                                                        <TableEditIcon />
                                                    </label>
                                                </div>
                                                <div className="w-4 mr-2 cursor-pointer transform hover:text-red-500 hover:scale-110">
                                                    <label onClick={() => handleDeleteStock(stock._id)} className="cursor-pointer">
                                                        <TableDeleteIcon />
                                                    </label>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <StockDetailsModal
                                        modalId={`details-${stock._id}`}
                                        stock={stock}
                                    />
                                    {/* <UpdateProductModal
                                        header="Update Product"
                                        modalId={`update-${stock._id}`}
                                        currentProduct={stock}
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

export default ManageStock;