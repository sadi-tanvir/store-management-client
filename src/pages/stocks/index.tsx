import { useQuery } from '@apollo/client';
import React from 'react';
import StockCard from '../../components/stocks/StockCard';
import { GET_STOCKS } from '../../gql/queries/stockQueries';
import { StocksType } from '../../types/stocks.types';


const Stock = () => {
    // gql
    const { loading, error, data } = useQuery(GET_STOCKS);


    return (
        <>
            <div className="w-full min-h-screen">
                <div className="w-full mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-4 px-3 sm:px-5 mt-10">
                    {
                        data?.stocks.map((stock: StocksType, index: number) => <StockCard key={index} stock={stock} />)
                    }
                </div>
            </div>
        </>
    );
};

export default Stock;