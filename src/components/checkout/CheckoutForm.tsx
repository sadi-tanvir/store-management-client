import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_OPEN_BATCH_BY_USER_REF } from '../../gql/queries/batchQueries';
import { useAppSelector } from '../../redux/hooks/hooks';
import SingleSelectOption from '../shared/components/SingleSelectOption';
import TextInputField from '../shared/components/TextInputField';


export type CheckoutFormType = {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checkOut: any
    batch: string
}

const CheckoutForm = ({ handleSubmit, handleChange, checkOut, batch }: CheckoutFormType) => {


    return (
        <>
            <div className="px-5 sm:px-10 w-full">
                <h3 className="text-lg font-bold mb-5 text-primary">Order Process</h3>

                <form onSubmit={handleSubmit}>
                    {/* <div className="w-full mt-5 mx-auto flex flex-col gap-2 px-2 bg-white rounded-lg border border-gray-200 shadow-md justify-center items-center cursor-pointer"> */}
                    <div className="my-3 w-full mx-auto flex flex-wrap gap-2 py-3 px-2 bg-white min-h-[50px] rounded-lg border border-gray-200 shadow-md justify-start items-center cursor-pointer">
                        <span className="flex w-full justify-start items-center bg-slate-300 text-slate-600 px-3 py-[3px] inline-block rounded border border-gray-200 shadow-sm">
                            {batch}
                            {batch && <span className="badge badge-primary text-teal-700 font-bold ml-3">current</span>}
                        </span>
                    </div>
                    {/* </div> */}
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
        </>
    );
};

export default CheckoutForm;