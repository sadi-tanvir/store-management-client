import { useMutation } from '@apollo/client';
import React, { useState, useRef } from 'react';
import Swal from "sweetalert2"
import { UPDATE_ORDER_MUTATION } from '../../gql/mutations/orderMutation';
import { GET_ORDERS } from '../../gql/queries/orderQueries';
import { UpdateOrderModalPropsType } from '../../types/ownerOrders.types';
import SelectInput from '../shared/components/SelectInput';
import TextInputField from '../shared/components/TextInputField';



const OwnerUpdateOrderModal = ({ modalId, header, currentOrder }: UpdateOrderModalPropsType) => {
    // gql
    const [updateStockMutation, { data, loading, error }] = useMutation(UPDATE_ORDER_MUTATION, {
        refetchQueries: [GET_ORDERS],
    });

    // state
    const modalRef: React.MutableRefObject<any> = useRef()
    const [order, setOrder] = useState({
        _id: currentOrder.id,
        paymentStatus: currentOrder.paymentStatus,
        trxId: currentOrder.trxId,
        orderStatus: currentOrder.orderStatus
    })

    // handle text input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setOrder({ ...order, [name]: value })
    }
    // handle Select input change
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setOrder({ ...order, [name]: value })

    }


    // update User
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { _id, paymentStatus, trxId, orderStatus } = order;
        Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#14b8a6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Update it!' })
            .then((result) => {
                if (result.isConfirmed) {
                    updateStockMutation({
                        variables: {
                            id: _id,
                            info: {
                                paymentStatus,
                                trxId,
                                orderStatus
                            }
                        }
                    })
                    Swal.fire('Updated!', 'Your order has been updated.', 'success')
                        .then(() => {
                            modalRef.current.checked = false;
                        })
                }
            })
    }


    return (
        <>
            {/* Put this part before </body> tag */}
            <input ref={modalRef} type="checkbox" id={modalId} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative px-5 sm:px-10">
                    <label htmlFor={modalId} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold mb-5">{header}</h3>

                    <form onSubmit={handleSubmit}>
                        <TextInputField
                            onChange={handleChange}
                            value={order.trxId}
                            label="Transaction ID"
                            name="trxId"
                            type="text"
                            placeholder="Transaction ID"
                            className="input-sm sm:input-md"
                        />
                        <SelectInput
                            onChange={handleSelectChange}
                            value={order.paymentStatus}
                            label="Payment Status"
                            name="paymentStatus"
                            options="unpaid paid"
                            className="select-sm sm:select-md"
                        />
                        <SelectInput
                            onChange={handleSelectChange}
                            value={order.orderStatus}
                            label="Order Status"
                            name="orderStatus"
                            options="pending processing delivered cancelled"
                            className="select-sm sm:select-md"
                        />
                        <button type="submit" className="btn btn-primary text-teal-700 font-bold btn-sm sm:btn-md w-full mx-auto mt-5 px-5">Update</button>
                    </form>
                </div>
            </div >
        </>
    );
};

export default OwnerUpdateOrderModal;