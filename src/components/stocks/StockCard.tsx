/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import classes from "../styles/product/product.module.css";
import { CartIcon, EyeIcon, StarIcon } from '../shared/icons/icons';
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
                        {[...Array(5)].map(() => <StarIcon />)}
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
                        <div className={`border border-gray-200 shadow-md badge px-4 py-[11px] font-semibold opacity-90 ${stock.status === 'in-stock' ? ' bg-teal-300 text-teal-600' : 'bg-red-300 text-red-500'}`}>
                            {stock.status}
                        </div>
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