/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import classes from "../styles/product/product.module.css";
import { CartIcon, EyeIcon } from '../shared/icons/icons';
import { StocksType } from '../../types/stocks.types';

const StockCard = ({ stock }: { stock: StocksType }) => {
    const [productName, setProductName] = useState<boolean>(false)

    return (
        <>
            <div className={`${classes.cardBody} card bg-base-100 shadow-xl`}>
                <figure className="px-10 pt-10">
                    <img src={stock.imageUrl} alt={stock.name} className="rounded-xl" />
                </figure>
                <div className="card-body items-start text-start">

                    <div className="flex items-center">
                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>
                    </div>
                    <h2 className="card-title">
                        {stock.name.length > 20 ?
                            <span>
                                {productName ? stock.name : `${stock.name.substring(0, 20)}...`}
                                <a onClick={() => setProductName(!productName)}
                                    href="#"
                                    className='text-sm text-red-400'>
                                    {productName ? ' less' : ' more'}
                                </a>
                            </span>
                            : stock.name}
                    </h2>
                    <div className="w-full flex justify-between pr-6">
                        <p className="text-red-400 font-semibold">
                            BDT {stock?.price}
                        </p>
                        <div className="badge badge-secondary">stock/{stock.category.name}</div>
                    </div>
                    {/* <div className={`${mousePointer ? "block" : "hidden"} flex flex-col justify-center items-center absolute right-5 top-16`}> */}
                    <div className={`${classes.productMenu} absolute right-5 bottom-5 border-2 border-secondary rounded px-1 py-3`}>
                        <div className={`indicator cursor-pointer`}>
                            {/* <span className="indicator-item badge badge-primary">0</span> */}
                            <CartIcon
                                iconClass="hover:scale-125 active:scale-100 transition-all cursor-pointer w-6 h-6 text-secondary"
                            />
                        </div>
                        <div title="see details" className={`hover:scale-125 active:scale-100 transition-all indicator cursor-pointer`}>
                            <EyeIcon
                                iconClass="w-6 h-6 mt-3 text-red-500 font-bold"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default React.memo(StockCard);