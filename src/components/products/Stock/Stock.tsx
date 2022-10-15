import React from 'react';
import ProductCard from './component/ProductCard';

const Stock = () => {
    return (
        <>
            <div className="w-full min-h-screen">
                <div className="w-full mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-4 px-3 sm:px-5 mt-10">
                    {
                        [...Array(5)].map(() => <ProductCard />)
                    }
                </div>
            </div>
        </>
    );
};

export default Stock;