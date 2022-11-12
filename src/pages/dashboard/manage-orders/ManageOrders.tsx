import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { GET_BRANDS_2, GET_BRAND_BY_ID } from '../../../gql/queries/brandQueries';
import { useAppDispatch } from '../../../redux/hooks/hooks';
import TableHeader from "../../../components/shared/components/TableHeader";
import { CurrencyBDIcon, EyesIcon, TableDeleteIcon, TableEditIcon } from '../../../components/shared/icons/icons';
import { GET_CATEGORIES } from '../../../gql/queries/categoryQueries';
import { GET_STOCKS, GET_STOCKS_WITH_DETAILS } from '../../../gql/queries/stockQueries';
import { DELETE_STOCK_MUTATION } from '../../../gql/mutations/stockMutation';
import StockDetailsModal from '../../../components/Dashboard/manage-stock/StockDetailsModal';
import UpdateStockModal from '../../../components/Dashboard/manage-stock/UpdateStockModal';
import { GET_SUPPLIERS } from '../../../gql/queries/supplierQueries';
import { ManageStockType } from '../../../types/dashboard/manageStocks.types';
import { GET_ORDERS } from '../../../gql/queries/orderQueries';
import OrderDetailsModal from '../../../components/Dashboard/manage-orders/OrderDetailsModal';
import { DELETE_ORDER_MUTATION } from '../../../gql/mutations/orderMutation';



export type ManageOrderType = {
    _id: string;
    email: string;
    phone: string;
    address: string;
    amount: number;
    paymentStatus: string;
    trxId: string;
    orderStatus: string;
    userId: {
        _id: string;
        email: string;
    };
    products: {
        _id: string;
        name: string;
        qty: number;
        price: number;
        imageUrl: string;
        category: string;
        brand: string;
        unit: string;
        stockId: {
            _id: string;
            name: string;
        }
    }[];
}


const ManageOrders = () => {
    // gql
    const orderResponse = useQuery(GET_ORDERS);
    const [getBrandByID, { loading, error, data, refetch }] = useLazyQuery(GET_BRAND_BY_ID);
    const [deleteOrderMutation] = useMutation(DELETE_ORDER_MUTATION, {
        refetchQueries: [GET_ORDERS],
    });

    // redux
    const dispatch = useAppDispatch();

    // handle Delete Stock
    const handleDeleteOrder = (id: string) => {
        Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#14b8a6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Delete it!' })
            .then((result) => {
                if (result.isConfirmed) {
                    deleteOrderMutation({
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



    return (
        <>
            <div className="w-full">
                <TableHeader headers={["email", "quantity", "Amount", "payment", "delivery", "actions"]}>
                    {
                        orderResponse?.data?.orders?.map((order: ManageOrderType, index: number) => {
                            return (
                                <>
                                    <tr key={order._id}>
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="mr-2">
                                                    {/* <img
                                                        className="w-8 h-8 rounded-full shadow-lg mr-2"
                                                        src={order.imageUrl}
                                                        alt="User"
                                                    /> */}
                                                </div>
                                                <span className="font-medium flex flex-col justify-start">
                                                    {order.email.length > 15 ? `${order.email.substring(0, 15)}..` : order.email}
                                                    <br />
                                                    <span>
                                                        {order.phone.length > 15 ? `${order.phone.substring(0, 15)}..` : order.phone}
                                                    </span>
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <div className="flex items-center">
                                                {/* <div className="mr-2">
                                                    <BrandIcon iconClass="h-5 w-5 text-primary" />
                                                </div> */}
                                                <span className={`bg-slate-200 text-slate-600  font-semibold rounded-full border border-gray-200 shadow-sm dark:bg-darkSecondary dark:border-gray-700 px-3 flex items-center py-[1px] cursor-pointer`}>
                                                    {
                                                        order?.products
                                                            .map((product: any) => product.qty)
                                                            .reduce((pre: any, cur: any) => pre + cur, 0)
                                                    } items
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex items-center justify-start">
                                                <span className='bg-slate-200 text-slate-600 font-semibold rounded-full border border-gray-200 shadow-sm dark:bg-darkSecondary dark:border-gray-700 px-3 flex items-center py-[1px] cursor-pointer'>
                                                    <CurrencyBDIcon iconClass="w-6 h-6 mr-px" />
                                                    {order.amount}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex items-center justify-start">
                                                <span className={`${order.paymentStatus === 'paid' ? 'bg-teal-200 text-teal-600 px-5' : 'bg-rose-200 text-rose-600'} uppercase font-semibold rounded-full border border-gray-200 shadow-sm dark:bg-darkSecondary dark:border-gray-700 px-3 flex items-center py-[2px] cursor-pointer`}>
                                                    {order.paymentStatus}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex items-center justify-start">
                                                <span className={`${order.orderStatus === 'delivered' ? 'bg-teal-200 text-teal-600 px-5' : 'bg-rose-200 text-rose-600'} uppercase font-semibold rounded-full border border-gray-200 shadow-sm dark:bg-darkSecondary dark:border-gray-700 px-3 flex items-center py-[2px] cursor-pointer`}>
                                                    {order.orderStatus}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="py-3 px-6 text-center">
                                            <div className="flex item-center justify-start">
                                                <div className="w-4 mr-2 cursor-pointer transform hover:text-primary hover:scale-110">
                                                    <label className="cursor-pointer" htmlFor={`details-${order._id}`}>
                                                        <EyesIcon />
                                                    </label>
                                                </div>
                                                <div className="w-4 mr-2 cursor-pointer transform hover:text-primary hover:scale-110">
                                                    <label onClick={() => handleEditBtn(order._id)} className="cursor-pointer" htmlFor={`update-${order._id}`}>
                                                        <TableEditIcon />
                                                    </label>
                                                </div>
                                                <div className="w-4 mr-2 cursor-pointer transform hover:text-red-500 hover:scale-110">
                                                    <label onClick={() => handleDeleteOrder(order._id)} className="cursor-pointer">
                                                        <TableDeleteIcon />
                                                    </label>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    {/* <StockDetailsModal
                                        modalId={`details-${order._id}`}
                                        order={order}
                                    /> */}
                                    {/* <UpdateStockModal
                                        header="Update Stock"
                                        modalId={`update-${order._id}`}
                                        currentStock={order}
                                        categories={categoryResponse?.data?.categories?.map((category: any) => {
                                            return {
                                                id: category._id,
                                                name: category.name,
                                            }
                                        })}
                                        brands={brandResponse?.data?.brands?.map((brand: any) => {
                                            return {
                                                id: brand._id,
                                                name: brand.name,
                                            }
                                        })}
                                        suppliers={supplierResponse?.data?.suppliers?.map((supplier: any) => {
                                            return {
                                                id: supplier._id,
                                                name: supplier.name,
                                            }
                                        })}
                                    /> */}
                                    <OrderDetailsModal
                                        modalId={`details-${order._id}`}
                                        order={order}
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

export default ManageOrders;