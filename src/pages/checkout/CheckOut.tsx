import { useMutation, useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import CheckoutForm from '../../components/checkout/CheckoutForm';
import OrderSummary from '../../components/checkout/OrderSummary';
import { CREATE_ORDER_MUTATION } from '../../gql/mutations/orderMutation';
import { GET_OPEN_BATCH_BY_USER_REF } from '../../gql/queries/batchQueries';
import { GET_ORDERS } from '../../gql/queries/orderQueries';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import classes from "../../components/styles/global-style/global.module.css";

const CheckOut = () => {
    // redux
    const dispatch = useAppDispatch()
    const { cart } = useAppSelector(state => state.cartReducer);
    const { ownerInfo, accountStatus, role } = useAppSelector(state => state.authReducer);

    // gql
    const [createOrderMutation, { data, loading, error }] = useMutation(CREATE_ORDER_MUTATION, {
        refetchQueries: [GET_ORDERS],
    });
    const batchResponse = useQuery(GET_OPEN_BATCH_BY_USER_REF, {
        variables: { id: ownerInfo._id }
    });


    const totalCartAmount: any = Object.values(cart).reduce((acc: any, item: any) => acc + item.price * item.qty, 0);

    const [checkOut, setCheckOut] = useState({
        batchRef: batchResponse?.data?.getOpenBatchByUserRef?._id,
        userId: ownerInfo._id,
        email: ownerInfo.email,
        phone: ownerInfo.phone,
        address: ownerInfo.permanentAddress,
        products: Object.values(cart),
        amount: totalCartAmount,
    })

    // handle text input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCheckOut({ ...checkOut, [name]: value })
    }

    // update User
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { batchRef, userId, email, phone, address, products, amount } = checkOut;
        Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#14b8a6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Create it!' })
            .then((result) => {
                if (result.isConfirmed) {
                    createOrderMutation({
                        variables: {
                            info: {
                                batchRef,
                                userId,
                                email,
                                phone,
                                address,
                                products,
                                amount,
                            }
                        }
                    })

                    dispatch({ type: 'clearCart' })
                }
            })
    }

    useEffect(() => {
        setCheckOut({
            batchRef: batchResponse?.data?.getOpenBatchByUserRef?._id,
            userId: ownerInfo._id,
            email: ownerInfo.email,
            phone: ownerInfo.phone,
            address: ownerInfo.permanentAddress,
            products: Object.values(cart),
            amount: totalCartAmount,
        })
    }, [ownerInfo, totalCartAmount, cart, batchResponse?.data?.getOpenBatchByUserRef])
    return (
        <>
            <div className={`w-full min-h-screen ${classes.global_background}`}>
                <div className={`relative w-full min-h-screen bg-slate-200 opacity-[0.70] pt-24`}>
                    <div className="flex flex-col sm:flex-row justify-between items-start mt-20">
                        {/* order summary */}
                        <OrderSummary
                            totalCartAmount={totalCartAmount}
                        />

                        {/* order checkout form */}
                        <CheckoutForm
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            checkOut={checkOut}
                            batch={batchResponse?.data?.getOpenBatchByUserRef?.batchNo}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CheckOut;