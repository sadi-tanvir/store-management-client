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
import { GET_ALL_ACTIVE_BATCHES, GET_BATCH_BY_ID } from '../../../../gql/queries/batchQueries';
import OrderDetailsModal from '../../../../components/Dashboard/manage-batches/OrderDetailsModal';
import { ManageOrderType } from '../../../../types/dashboard/manageBatch.types';
import Breadcrumbs from '../../../../components/shared/components/Breadcrumbs';
import ReactHelmet from '../../../../components/shared/components/ReactHelmet';
import UserBatchCard from '../../../../components/Dashboard/manage-batches/UserBatchCard';
import classes from "../../../../components/styles/global-style/global.module.css"
import { CLOSE_BATCH_MUTATION, RE_OPEN_BATCH_MUTATION } from '../../../../gql/mutations/batchMutation';

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
    const [closeBatchMutation] = useMutation(CLOSE_BATCH_MUTATION, {
        refetchQueries: [GET_BATCH_BY_ID, GET_ALL_ACTIVE_BATCHES],
    });
    const [reOpenBatchMutation] = useMutation(RE_OPEN_BATCH_MUTATION, {
        refetchQueries: [GET_BATCH_BY_ID, GET_ALL_ACTIVE_BATCHES],
    });
    const orders = orderResponse?.data?.getOrdersByBatchAndUserId

    // total order amount
    const orderExpandArr = orders?.map((order: any) => {
        return order.products.map((product: any) => product.price)
    })
    const totalOrderAmount = orderExpandArr
        ?.reduce((pre: number[], curr: number[]) => [...pre, ...curr], [])
        .reduce((pre: number, curr: number) => pre + curr, 0)

    // medicine quantity
    let medicineQuantity = []
    let totalMedicineQty = 0;
    for (let i = 0; i < orders?.length; i++) {
        for (let z = 0; z < orders[i].products.length; z++) {
            if (orders[i].products[z].category === 'medicine') {
                medicineQuantity.push(orders[i].products[z].qty)
            }
        }
    }
    for (let i = 0; i < medicineQuantity.length; i++) {
        totalMedicineQty = totalMedicineQty + medicineQuantity[i]
    }

    // feed quantity
    let feedQuantity = []
    let totalFeedQty = 0;
    for (let i = 0; i < orders?.length; i++) {
        for (let z = 0; z < orders[i].products.length; z++) {
            if (orders[i].products[z].category.split(" ")[1] === 'feed') {
                feedQuantity.push(orders[i].products[z].qty)
            }
        }
    }
    for (let i = 0; i < feedQuantity.length; i++) {
        totalFeedQty = totalFeedQty + feedQuantity[i]
    }

    // chicks quantity
    let chicksQuantity = []
    let totalChicksQty = 0;
    for (let i = 0; i < orders?.length; i++) {
        for (let z = 0; z < orders[i].products.length; z++) {
            if (orders[i].products[z].category === 'newborn chicks') {
                chicksQuantity.push(orders[i].products[z].qty)
            }
        }
    }
    for (let i = 0; i < chicksQuantity.length; i++) {
        totalChicksQty = totalChicksQty + chicksQuantity[i]
    }


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

    // close the batch
    const closeBatchById = (batchId: string) => {
        Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#14b8a6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Close it!' })
            .then((result) => {
                if (result.isConfirmed) {
                    closeBatchMutation({
                        variables: {
                            batchId: batchId
                        }
                    })
                }
            })
    }

    // Re-Open the batch
    const reOpenBatchById = (batchId: string) => {
        Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#14b8a6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Re-Open it!' })
            .then((result) => {
                if (result.isConfirmed) {
                    reOpenBatchMutation({
                        variables: {
                            batchId: batchId
                        }
                    })
                }
            })
    }

    return (
        <>
            <div className={`w-full min-h-screen ${classes.global_background}`}>
                <div className={`min-h-screen bg-slate-200 opacity-[0.80] pt-24`}>
                    <div className={`px-5 grid grid-cols-1 sm:grid-cols-2 items-center`}>
                        <div>
                            <Breadcrumbs firstPath="/dashboard" firstName="Dashboard" secondPath={`/user/${userId}`} secondName="User's Profile" current="Batch Details" />
                            <ReactHelmet title={'Batch Details - Store Management'} />
                        </div>
                        <div className="ml-auto w-full sm:w-64 flex flex-col gap-2 sm:px-2 rounded-lg justify-center items-center cursor-pointer">
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
                    <div className="w-full mt-10">
                        <div className="px-5 w-full grid grid-cols-1 sm:grid-cols-3 mx-auto">
                            <UserBatchCard
                                isThisCard={true}
                                batch={batchResponse?.data?.getBatchById}
                                closeBatchById={closeBatchById}
                                reOpenBatchById={reOpenBatchById}
                            />

                            <div className="sm:col-span-2 ml-auto w-full sm:w-72 mt-5 flex flex-col gap-2 sm:px-2 rounded-lg justify-center items-center cursor-pointer">
                                <div className="my-3 w-full mx-auto flex flex-wrap gap-2 py-3 px-2 bg-white min-h-[50px] rounded-lg border border-gray-200 shadow-md justify-start items-center cursor-pointer">
                                    <div className="flex flex-col w-full justify-start font-bold items-start bg-slate-300 text-slate-600 px-3 py-[3px] inline-block rounded border border-gray-200 shadow-sm">
                                        {totalChicksQty > 0 &&
                                            <span className="flex items-center">
                                                <img
                                                    className="w-5 h-5 rounded-full shadow-lg mr-2"
                                                    src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX3ED1X-8PRTBBgdbgkiLYZQwYN0IUKtGISA&usqp=CAU`}
                                                    alt="User"
                                                />
                                                Total Chicks: {totalChicksQty} pcs
                                            </span>}
                                        {totalFeedQty > 0 &&
                                            <span className="flex items-center">
                                                <img
                                                    className="w-5 h-5 rounded-full shadow-lg mr-2"
                                                    src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsXklzmIGhnKcpEhzu1C8xFmDoky3doyMzKA&usqp=CAU`}
                                                    alt="User"
                                                />
                                                Total Feed: {totalFeedQty}bag
                                            </span>}
                                        {totalMedicineQty > 0 &&
                                            <span className="flex items-center">
                                                <img
                                                    className="w-5 h-5 rounded-full shadow-lg mr-2"
                                                    src={`https://www.shutterstock.com/image-vector/various-meds-pills-capsules-blisters-260nw-1409823341.jpg`}
                                                    alt="User"
                                                />
                                                Total Medicine: {totalMedicineQty}pcs
                                            </span>}
                                        <span className="flex items-center">
                                            <CurrencyBDIcon iconClass="w-6 h-6" />
                                            Total Amount: {totalOrderAmount} bdt
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            {
                                orders?.length <= 0 ?
                                    <h1 className="text-center text-2xl uppercase font-bold mt-10 text-secondary">No data available</h1>
                                    :
                                    <TableHeader headers={["email", "quantity", "Amount", "payment", "delivery", "actions"]}>
                                        {
                                            orders?.map((order: ManageOrderType, index: number) => {
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
                                                                                ?.map((product: any) => product.qty)
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
                                                                    {/* <div className="w-4 mr-2 cursor-pointer transform hover:text-primary hover:scale-110">
                                                                        <label className="cursor-pointer" htmlFor={`update-${order._id}`}>
                                                                            <TableEditIcon />
                                                                        </label>
                                                                    </div> */}
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default IndividualBatchDetails;