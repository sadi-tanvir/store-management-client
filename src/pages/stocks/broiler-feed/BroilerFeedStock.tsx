import { useQuery } from '@apollo/client';
import React from 'react';
import Breadcrumbs from '../../../components/shared/components/Breadcrumbs';
import ReactHelmet from '../../../components/shared/components/ReactHelmet';
import StockCard from '../../../components/stocks/StockCard';
import { GET_STOCKS_BY_CATEGORY } from '../../../gql/queries/stockQueries';
import { StockCardPropsType } from '../../../types/stocks.types';
import classes from "../../../components/styles/global-style/global.module.css"
import Footer from '../../Footer/Footer';


const BroilerFeedStock = () => {

    // gql
    const broilerFeedStocks = useQuery(GET_STOCKS_BY_CATEGORY, {
        variables: {
            category: 'broiler feed'
        }
    });


    return (
        <>
            <div className={`w-full min-h-screen ${classes.global_background}`}>
                <div className={`relative min-h-screen bg-slate-200 opacity-[0.70] pt-24 pb-[870px] md:pb-[460px] lg:pb-[480px]`}>
                    <div className="ml-5">
                        <Breadcrumbs firstPath="/stocks" firstName="Stocks" current="Broiler Feed" />
                        <ReactHelmet title={'Broiler Feed - Store Management'} />
                    </div>

                    {/* medicine stocks */}
                    <div className='mt-3'>
                        <h1 className='ml-5 mb-3 text-2xl text-secondary font-bold'>Broiler Feed - ব্রয়লার ফিড</h1>

                        <div className="w-full mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-4 px-3 sm:px-5">
                            {
                                broilerFeedStocks?.data?.getStocksByCategory
                                    .map((stock: StockCardPropsType, index: number) => <StockCard key={index} stock={stock} />)
                            }
                        </div>
                    </div>

                    {/* footer section */}
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default BroilerFeedStock;