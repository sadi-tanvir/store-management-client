import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import StockCard from '../../components/stocks/StockCard';
import { GET_STOCKS_BY_CATEGORY } from '../../gql/queries/stockQueries';
import { StockCardPropsType } from '../../types/stocks.types';


const Stock = () => {
    // gql
    const medicineStocks = useQuery(GET_STOCKS_BY_CATEGORY, {
        variables: {
            category: 'medicine'
        }
    });
    // gql
    const broilerFeedStocks = useQuery(GET_STOCKS_BY_CATEGORY, {
        variables: {
            category: 'broiler feed'
        }
    });
    // gql
    const layerFeedStocks = useQuery(GET_STOCKS_BY_CATEGORY, {
        variables: {
            category: 'layer feed'
        }
    });

    const navigate = useNavigate();

    return (
        <>
            <div className="w-full min-h-screen">
                {/* medicine stocks */}
                <div className='mt-7'>
                    <div className='w-full flex justify-between'>
                        <h1 className='ml-5 text-2xl text-secondary font-bold'>Medicines</h1>
                        <button className='btn btn-sm btn-secondary px-5 mr-5'>view all</button>
                    </div>
                    <div className="w-full mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-4 px-3 sm:px-5">
                        {
                            medicineStocks?.data?.getStocksByCategory.slice(0, 4).map((stock: StockCardPropsType, index: number) => <StockCard key={index} stock={stock} />)
                        }
                    </div>
                </div>
                {/* broiler feed stocks */}
                <div className='mt-10'>
                    <div className='w-full flex justify-between'>
                        <h1 className='ml-5 text-2xl text-secondary font-bold'>Broiler Feed - ব্রয়লার ফিড</h1>
                        <button className='btn btn-sm btn-secondary px-5 mr-5'>view all</button>
                    </div>
                    <div className="w-full mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-4 px-3 sm:px-5">
                        {
                            broilerFeedStocks?.data?.getStocksByCategory.slice(0, 4).map((stock: StockCardPropsType, index: number) => <StockCard key={index} stock={stock} />)
                        }
                    </div>
                </div>
                {/* layer feed stocks */}
                <div className='mt-7'>
                    <h1 className='ml-5 text-2xl text-secondary font-bold'>Layer Feed - লেয়ার ফিড</h1>
                    <div className="w-full mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-4 px-3 sm:px-5">
                        {
                            layerFeedStocks?.data?.getStocksByCategory.slice(0, 4).map((stock: StockCardPropsType, index: number) => <StockCard key={index} stock={stock} />)
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Stock;