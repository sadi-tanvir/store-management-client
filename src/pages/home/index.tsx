import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks'
import Cart from '../../components/cart/Cart';




const Home = () => {

    const { value } = useAppSelector(state => state.counterReducer);
    const dispatch = useAppDispatch()

    return (
        <>
            <div className="w-full mx-auto text-center dark:bg-darkPrimary">
                <h1 className='text-2xl text-primary dark:text-deepDark font-bold block'>
                    afsfsdafsfsdfs
                </h1>
                <div className="w-4/12 mx-auto flex flex-wrap gap-2 py-3 px-2 bg-white min-h-[50px] rounded-lg border border-gray-200 shadow-md justify-center items-center">
                    {/* <span className="bg-red-300 text-red-600 px-3 py-[1px] inline-block rounded-full border border-gray-200 shadow-sm">select a supplier</span> */}
                    <span className="bg-teal-300 text-teal-600 px-3 py-[1px] inline-block rounded-full border border-gray-200 shadow-sm">amar sonar bangla</span>
                    <span className="bg-teal-300 text-teal-600 px-3 py-[1px] inline-block rounded-full border border-gray-200 shadow-sm">amar sonar bangla</span>
                    <span className="bg-teal-300 text-teal-600 px-3 py-[1px] inline-block rounded-full border border-gray-200 shadow-sm">amar sonar bangla amar sonar banglaamar sonar bangla</span>
                    <span className="bg-teal-300 text-teal-600 px-3 py-[1px] inline-block rounded-full border border-gray-200 shadow-sm">amar sonar bangla</span>
                    <span className="bg-teal-300 text-teal-600 px-3 py-[1px] inline-block rounded-full border border-gray-200 shadow-sm">amar sonar bangla</span>
                </div>
                <div className="w-4/12 mx-auto py-3 px-2 bg-white min-h-[50px] rounded-lg border border-gray-200 shadow-md">
                    {/* <div className="bg-red-200 w-full min-h-[50px]"> */}
                    <span className="my-2 bg-teal-300 text-teal-600 px-3 py-[1px] block rounded-md border border-gray-200 shadow-sm text-start">
                        amar sonar bangla
                    </span>
                    <span className="my-2 bg-teal-300 text-teal-600 px-3 py-[1px] block rounded-md border border-gray-200 shadow-sm text-start">
                        amar sonar bangla
                    </span>
                    <span className="my-2 bg-teal-300 text-teal-600 px-3 py-[1px] block rounded-md border border-gray-200 shadow-sm text-start">
                        amar sonar bangla
                    </span>
                    <span className="my-2 bg-teal-300 text-teal-600 px-3 py-[1px] block rounded-md border border-gray-200 shadow-sm text-start">
                        amar sonar bangla
                    </span>
                    <span className="my-2 bg-teal-300 text-teal-600 px-3 py-[1px] block rounded-md border border-gray-200 shadow-sm text-start">
                        amar sonar bangla
                    </span>
                    {/* </div> */}
                </div>


                <button onClick={() => dispatch({ type: 'increment' })} className="btn btn-primary">increment</button>
                <button className="btn btn-secondary">filter</button>
            </div>
        </>
    );
};

export default Home;