import { useMutation } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import SelectInput from '../../components/shared/components/SelectInput';
import TextInputField from '../../components/shared/components/TextInputField';
import { CREATE_ORDER_MUTATION } from '../../gql/mutations/orderMutation';
import { useAppSelector } from '../../redux/hooks/hooks';

const CheckOut = () => {
    // redux
    const { cart } = useAppSelector(state => state.cartReducer);
    const { ownerInfo, accountStatus, role } = useAppSelector(state => state.authReducer);

    // gql
    const [createOrderMutation, { data, loading, error }] = useMutation(CREATE_ORDER_MUTATION, {
        // refetchQueries: [GET_BRANDS],
    });

    const totalCartAmount: any = Object.values(cart).reduce((acc: any, item: any) => acc + item.price * item.qty, 0);

    const [checkOut, setCheckOut] = useState({
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
        const { userId, email, phone, address, products, amount } = checkOut;
        Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#14b8a6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Create it!' })
            .then((result) => {
                if (result.isConfirmed) {
                    createOrderMutation({
                        variables: {
                            info: {
                                userId,
                                email,
                                phone,
                                address,
                                products,
                                amount,
                            }
                        }
                    })
                }
            })
    }

    useEffect(() => {
        setCheckOut({
            userId: ownerInfo._id,
            email: ownerInfo.email,
            phone: ownerInfo.phone,
            address: ownerInfo.permanentAddress,
            products: Object.values(cart),
            amount: totalCartAmount,
        })
    }, [ownerInfo, totalCartAmount, cart])
    return (
        <>
            <div className="flex justify-between items-start mt-20">


                <div className="w-full mx-auto">
                    <div className="w-full flex justify-center md:flex-row flex-col items-stretch space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full dark:bg-gray-800 space-y-6">
                            <h3 className="text-xl dark:text-white font-bold leading-5 text-primary">Summary</h3>
                            <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                <div className="flex justify-between w-full">
                                    <p className="text-base dark:text-white leading-4 text-gray-800">Subtotal</p>
                                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">${totalCartAmount}</p>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <p className="text-base dark:text-white leading-4 text-gray-800">Discount
                                        <span className="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">
                                            Offer
                                        </span>
                                    </p>
                                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">-$0.00 (00%)</p>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <p className="text-base dark:text-white leading-4 text-gray-800">Shipping</p>
                                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">$0.00 (free)</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
                                <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">${totalCartAmount}</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="px-5 sm:px-10 w-full">
                    <h3 className="text-lg font-bold mb-5 text-primary">Shipping Address</h3>

                    <form onSubmit={handleSubmit}>
                        <TextInputField
                            onChange={handleChange}
                            value={checkOut.email}
                            label="Email"
                            name="email"
                            type="text"
                            placeholder="Email"
                            className="input-sm sm:input-md"
                        />
                        <TextInputField
                            onChange={handleChange}
                            value={checkOut.phone}
                            label="Phone"
                            name="phone"
                            type="number"
                            placeholder="Phone"
                            className="input-sm sm:input-md"
                        />
                        <TextInputField
                            onChange={handleChange}
                            value={checkOut.address}
                            label="Address"
                            name="address"
                            type="text"
                            placeholder="Address"
                            className="input-sm sm:input-md"
                        />

                        <button type="submit" className="btn btn-primary text-teal-700 font-bold btn-sm sm:btn-md w-full mx-auto mt-5 px-5">Place Order</button>
                    </form>
                </div>



            </div>
        </>
    );
};

export default CheckOut;