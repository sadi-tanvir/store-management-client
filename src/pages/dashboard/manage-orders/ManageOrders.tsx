import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import Swal from 'sweetalert2';
import { GET_BRAND_BY_ID } from '../../../gql/queries/brandQueries';
import { useAppDispatch } from '../../../redux/hooks/hooks';
import TableHeader from "../../../components/shared/components/TableHeader";
import { CurrencyBDIcon, EyesIcon, TableDeleteIcon, TableEditIcon } from '../../../components/shared/icons/icons';
import { GET_ORDERS } from '../../../gql/queries/orderQueries';
import OrderDetailsModal from '../../../components/Dashboard/manage-orders/OrderDetailsModal';
import { DELETE_ORDER_MUTATION } from '../../../gql/mutations/orderMutation';
import UpdateOrderModal from '../../../components/Dashboard/manage-orders/UpdateOrderModal';
import { ManageOrderType } from '../../../types/dashboard/manageOrders.types';
import Breadcrumbs from '../../../components/shared/components/Breadcrumbs';
import ReactHelmet from '../../../components/shared/components/ReactHelmet';



const ManageOrders = () => {
    // gql
    const orderResponse = useQuery(GET_ORDERS);
    const [deleteOrderMutation] = useMutation(DELETE_ORDER_MUTATION, {
        refetchQueries: [GET_ORDERS],
    });


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



    return (
        <>
            <div className="px-5">
                <Breadcrumbs firstPath="/dashboard" firstName="Dashboard" current="Manage Orders" />
                <ReactHelmet title={'Manage Orders - Store Management'} />
            </div>
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

                                    <UpdateOrderModal
                                        header="Update Order"
                                        modalId={`update-${order._id}`}
                                        currentOrder={{
                                            id: order._id,
                                            paymentStatus: order.paymentStatus,
                                            trxId: order.trxId,
                                            orderStatus: order.orderStatus
                                        }}
                                    />

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