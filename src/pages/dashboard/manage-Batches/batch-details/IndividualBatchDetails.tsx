import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import Swal from 'sweetalert2';
import { GET_BRAND_BY_ID } from '../../../../gql/queries/brandQueries';
import { useAppDispatch } from '../../../../redux/hooks/hooks';
import TableHeader from "../../../../components/shared/components/TableHeader";
import { CurrencyBDIcon, EyesIcon, TableDeleteIcon, TableEditIcon } from '../../../../components/shared/icons/icons';
import { GET_ORDERS, GET_ORDERS_BY_BATCH_AND_USER } from '../../../../gql/queries/orderQueries';
import { DELETE_ORDER_MUTATION } from '../../../../gql/mutations/orderMutation';
import UpdateOrderModal from '../../../../components/Dashboard/manage-orders/UpdateOrderModal';
import UserInfoCard from '../../../../components/Dashboard/manage-batches/UserInfoCard';
import { useParams } from 'react-router-dom';
import { GET_BATCH_BY_ID } from '../../../../gql/queries/batchQueries';
import OrderDetailsModal from '../../../../components/Dashboard/manage-batches/OrderDetailsModal';
import { ManageOrderType } from '../../../../types/dashboard/manageBatch.types';
import Breadcrumbs from '../../../../components/shared/components/Breadcrumbs';
import ReactHelmet from '../../../../components/shared/components/ReactHelmet';


const IndividualBatchDetails = () => {
    // router
    const { batchDetail } = useParams();
    const batchParams = batchDetail?.split('_');
    const batchId = batchParams?.[0];
    const userId = batchParams?.[1];

    // gql
    const batchResponse = useQuery(GET_BATCH_BY_ID, {
        variables: { batchId: batchId }
    });
    const orderResponse = useQuery(GET_ORDERS_BY_BATCH_AND_USER, {
        variables: {
            batchId: batchId,
            userId: userId
        }
    });
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
                <Breadcrumbs firstPath="/dashboard" firstName="Dashboard" secondPath={`/user/${userId}`} secondName="User's Profile" current="Batch Details" />
                <ReactHelmet title={'Batch Details'} />
            </div>
            <div className="w-full mt-10">
                <div className="px-5 w-full flex flex-col sm:flex-row justify-between items-center sm:items-start mx-auto">
                    <UserInfoCard />

                    <div className="w-64 mt-5 flex flex-col gap-2 px-2  rounded-lg justify-center items-center cursor-pointer">
                        <div className="my-3 w-full mx-auto flex flex-wrap gap-2 py-3 px-2 bg-white min-h-[50px] rounded-lg border border-gray-200 shadow-md justify-start items-center cursor-pointer">
                            <span className="flex w-full justify-center font-bold items-center bg-slate-300 text-slate-600 px-3 py-[3px] inline-block rounded border border-gray-200 shadow-sm">
                                {batchResponse?.data?.getBatchById?.batchNo}
                                <span className={`${batchResponse?.data?.getBatchById?.status === 'open' ? 'bg-teal-200 text-teal-700' : 'bg-rose-200 text-rose-600'} ml-3 rounded-full px-3 font-semibold`}>
                                    {batchResponse?.data?.getBatchById?.status === 'open' ? 'current' : 'closed'}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    {
                        orderResponse?.data?.getOrdersByBatchAndUserId?.length <= 0 ?
                            <h1 className="text-center text-2xl uppercase font-bold mt-10 text-secondary">No data available</h1>
                            :
                            <TableHeader headers={["email", "quantity", "Amount", "payment", "delivery", "actions"]}>
                                {
                                    orderResponse?.data?.getOrdersByBatchAndUserId?.map((order: ManageOrderType, index: number) => {
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

                                                {/* <UpdateOrderModal
                                                    header="Update Order"
                                                    modalId={`update-${order._id}`}
                                                    currentOrder={{
                                                        id: order._id,
                                                        paymentStatus: order.paymentStatus,
                                                        trxId: order.trxId,
                                                        orderStatus: order.orderStatus
                                                    }}
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
                    }
                </div>
            </div >
        </>
    );
};

export default IndividualBatchDetails;