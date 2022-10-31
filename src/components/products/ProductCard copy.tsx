/* eslint-disable jsx-a11y/anchor-is-valid */
import { log } from 'console';
import React, { useEffect, useState } from 'react';
import { CartIcon, EyeIcon } from '../shared/icons/icons';
import classes from "../../../styles/product/product.module.css";

const ProductCard = () => {
    const [productName, setProductName] = useState<boolean>(true)
    let productName2 = '2.2KW Auto Start Sakura Engine Generator LG2700EX-AT'


    return (
        <>
            <div className="card w-96 shadow-xl image-full  bg-opacity-0">
                <figure><img src="https://images.unsplash.com/photo-1509043759401-136742328bb3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80" alt="Shoes" /></figure>
                <div className={`${classes.cardBody} card-body relative`}>
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
                    <div className={`${classes.productMenu} absolute right-5 top-20`}>
                        <div className={`indicator cursor-pointer`}>
                            <span className="indicator-item badge badge-primary">0</span>
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