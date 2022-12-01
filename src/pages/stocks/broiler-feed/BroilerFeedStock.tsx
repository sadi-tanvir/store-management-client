import { useQuery } from '@apollo/client';
import React from 'react';
import Breadcrumbs from '../../../components/shared/components/Breadcrumbs';
import ReactHelmet from '../../../components/shared/components/ReactHelmet';
import StockCard from '../../../components/stocks/StockCard';
import { GET_STOCKS_BY_CATEGORY } from '../../../gql/queries/stockQueries';
import { StockCardPropsType } from '../../../types/stocks.types';



const BroilerFeedStock = () => {

    // gql
    const broilerFeedStocks = useQuery(GET_STOCKS_BY_CATEGORY, {
        variables: {
            category: 'broiler feed'
        }
    });


    return (
        <>
            <div className="w-full min-h-screen">
                <div className="ml-5">
                    <Breadcrumbs firstPath="/stocks" firstName="Stocks" current="Broiler Feed" />
                    <ReactHelmet title={'Broiler Feed - Store Management'} />
                </div>

                {/* medicine stocks */}
                <div className='mt-7'>
                    <h1 className='ml-5 text-2xl text-secondary font-bold'>Broiler Feed - ব্রয়লার ফিড</h1>

                    <div className="w-full mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-4 px-3 sm:px-5">
                        {
                            broilerFeedStocks?.data?.getStocksByCategory
                                .map((stock: StockCardPropsType, index: number) => <StockCard key={index} stock={stock} />)
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default BroilerFeedStock;