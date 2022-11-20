import { useState, useEffect } from "react";
import { useMutation, useQuery } from '@apollo/client';
import Swal from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import TableHeader from "../../components/shared/components/TableHeader";
import { CurrencyBDIcon, EyesIcon, TableDeleteIcon, TableEditIcon } from '../../components/shared/icons/icons';
import { GET_ORDERS } from '../../gql/queries/orderQueries';
import { DELETE_ORDER_MUTATION } from '../../gql/mutations/orderMutation';
import OwnerUpdateOrderModal from "../../components/owner-orders/OwnerUpdateOrderModal";
import OwnerOrderDetailsModal from "../../components/owner-orders/OwnerOrderDetailsModal";
import { ManageOrderType } from "../../types/ownerOrders.types";






const OwnerIndividualBatchDetails = () => {
    // gql
    const orderResponse = useQuery(GET_ORDERS);
    const [deleteOrderMutation] = useMutation(DELETE_ORDER_MUTATION, {
        refetchQueries: [GET_ORDERS],
    });

    // redux
    const { ownerInfo, accountStatus, role } = useAppSelector(state => state.authReducer);

    // state
    const [ownerOrders, setOwnerOrders] = useState([]);

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

    useEffect(() => {
        if (orderResponse.data) {
            setOwnerOrders(() => {
                return orderResponse?.data?.orders.filter((order: ManageOrderType) => order.userId._id === ownerInfo._id)
            })
        }
    }, [orderResponse?.data?.orders])


    return (
        <>
            <div className="w-full mt-3">
                <h1 className="px-6 text-2xl font-bold text-start text-slate-600">My Orders</h1>
                <TableHeader headers={["email", "quantity", "Amount", "payment", "delivery", "actions"]}>
                    {
                        ownerOrders?.map((order: ManageOrderType, index: number) => {
                            return (
                                <>
                                    <tr key={order._id}>
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <div className="flex items-center">
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
                                                    <label className="cursor-pointer" htmlFor={`update-${order._id}`}>
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

                                    <OwnerUpdateOrderModal
                                        header="Update Order"
                                        modalId={`update-${order._id}`}
                                        currentOrder={{
                                            id: order._id,
                                            paymentStatus: order.paymentStatus,
                                            trxId: order.trxId,
                                            orderStatus: order.orderStatus
                                        }}
                                    />

                                    <OwnerOrderDetailsModal
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

export default OwnerIndividualBatchDetails;