/* eslint-disable jsx-a11y/anchor-is-valid */
import { log } from 'console';
import React, { useEffect, useState } from 'react';
import { CartIcon, EyeIcon } from '../../../shared/icons/icons';
import classes from "../../../styles/product/product.module.css";

const ProductCard = () => {
    const [productName, setProductName] = useState<boolean>(false)
    let productName2 = '2.2KW Auto Start Sakura Engine Generator LG2700EX-AT'


    return (
        <>
            <div className={`${classes.cardBody} card bg-base-100 shadow-xl`}>
                <figure className="px-10 pt-10">
                    <img src="https://placeimg.com/400/225/arch" alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-start text-start">
                    <h2 className="card-title">
                        {productName2.length > 20 ?
                            <span>
                                {productName ? productName2 : `${productName2.substring(0, 20)}...`}
                                <a onClick={() => setProductName(!productName)}
                                    href="#"
                                    className='text-sm text-red-400'>
                                    {productName ? ' less' : ' more'}
                                </a>
                            </span>
                            : productName2}
                    </h2>
                    <p className="text-red-400 font-semibold">
                        BDT 45,000
                    </p>
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

export default React.memo(ProductCard);