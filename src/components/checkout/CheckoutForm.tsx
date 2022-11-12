import React from 'react';
import TextInputField from '../shared/components/TextInputField';


export type CheckoutFormType = {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checkOut: any
}

const CheckoutForm = ({ handleSubmit, handleChange, checkOut }: CheckoutFormType) => {
    return (
        <>
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
        </>
    );
};

export default CheckoutForm;