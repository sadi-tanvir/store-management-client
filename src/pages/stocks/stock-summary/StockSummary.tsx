import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../../components/shared/components/Breadcrumbs';
import ReactHelmet from '../../../components/shared/components/ReactHelmet';
import StockCard from '../../../components/stocks/StockCard';
import { GET_STOCKS_BY_CATEGORY } from '../../../gql/queries/stockQueries';
import { StockCardPropsType } from '../../../types/stocks.types';
import classes from "../../../components/styles/global-style/global.module.css"
import Footer from '../../Footer/Footer';

const StockSummary = () => {
    // gql
    const medicineStocks = useQuery(GET_STOCKS_BY_CATEGORY, {
        variables: {
            category: 'medicine'
        }
    });
    const broilerFeedStocks = useQuery(GET_STOCKS_BY_CATEGORY, {
        variables: {
            category: 'broiler feed'
        }
    });
    const babyChickenStocks = useQuery(GET_STOCKS_BY_CATEGORY, {
        variables: {
            category: 'newborn chicks'
        }
    });
    const layerFeedStocks = useQuery(GET_STOCKS_BY_CATEGORY, {
        variables: {
            category: 'layer feed'
        }
    });
    const animalFeedStocks = useQuery(GET_STOCKS_BY_CATEGORY, {
        variables: {
            category: 'animal feed'
        }
    });

    const navigate = useNavigate();
    return (
        <>
            <div className={`w-full min-h-screen ${classes.global_background}`}>
                <div className={`relative w-full min-h-screen bg-slate-200 opacity-[0.70] pt-24 pb-[870px] md:pb-[460px] lg:pb-[480px]`}>
                    <div className="ml-5">
                        <Breadcrumbs firstPath="/" firstName="Home" current="Stocks" />
                        <ReactHelmet title={'Stocks - Store Management'} />
                    </div>
                    {/* medicine stocks */}
                    <div className='mt-7'>
                        <div className='w-full flex justify-between mb-2'>
                            <h1 className='ml-5 text-2xl text-secondary font-bold'>Medicines - ঔষধ</h1>
                            <button onClick={() => navigate('/stocks/medicine-stock')} className='btn btn-sm btn-secondary px-5 mr-5'>view all</button>
                        </div>
                        <div className="w-full mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-4 px-3 sm:px-5">
                            {
                                medicineStocks?.data?.getStocksByCategory.slice(0, 4).map((stock: StockCardPropsType, index: number) => <StockCard key={index} stock={stock} />)
                            }
                        </div>
                    </div>

                    {/* baby chicken stocks */}
                    <div className='mt-7'>
                        <div className='w-full flex justify-between mb-2'>
                            <h1 className='ml-5 text-2xl text-secondary font-bold'>Baby Chicken - মুরগির বাচ্চা</h1>
                            <button onClick={() => navigate('/stocks/baby-chicken-stock')} className='btn btn-sm btn-secondary px-5 mr-5'>view all</button>
                        </div>
                        <div className="w-full mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-4 px-3 sm:px-5">
                            {
                                babyChickenStocks?.data?.getStocksByCategory.slice(0, 4).map((stock: StockCardPropsType, index: number) => <StockCard key={index} stock={stock} />)
                            }
                        </div>
                    </div>

                    {/* broiler feed stocks */}
                    <div className='mt-10'>
                        <div className='w-full flex justify-between mb-2'>
                            <h1 className='ml-5 text-2xl text-secondary font-bold'>Broiler Feed - ব্রয়লার ফিড</h1>
                            <button onClick={() => navigate('/stocks/broiler-feed-stock')} className='btn btn-sm btn-secondary px-5 mr-5'>view all</button>
                        </div>
                        <div className="w-full mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-4 px-3 sm:px-5">
                            {
                                broilerFeedStocks?.data?.getStocksByCategory.slice(0, 4).map((stock: StockCardPropsType, index: number) => <StockCard key={index} stock={stock} />)
                            }
                        </div>
                    </div>

                    {/* layer feed stocks */}
                    <div className='mt-7'>
                        <div className='w-full flex justify-between mb-2'>
                            <h1 className='ml-5 text-2xl text-secondary font-bold'>Layer Feed - লেয়ার ফিড</h1>
                            <button onClick={() => navigate('/stocks/layer-feed-stock')} className='btn btn-sm btn-secondary px-5 mr-5'>view all</button>
                        </div>
                        <div className="w-full mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-4 px-3 sm:px-5">
                            {
                                layerFeedStocks?.data?.getStocksByCategory.slice(0, 4).map((stock: StockCardPropsType, index: number) => <StockCard key={index} stock={stock} />)
                            }
                        </div>
                    </div>

                    {/* animal feed stocks */}
                    <div className='mt-7'>
                        <div className='w-full flex justify-between mb-2'>
                            <h1 className='ml-5 text-2xl text-secondary font-bold'>Animal Feed - পশু খাদ্য</h1>
                            <button onClick={() => navigate('/stocks/animal-feed-stock')} className='btn btn-sm btn-secondary px-5 mr-5'>view all</button>
                        </div>
                        <div className="w-full mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-4 px-3 sm:px-5">
                            {
                                animalFeedStocks?.data?.getStocksByCategory.slice(0, 4).map((stock: StockCardPropsType, index: number) => <StockCard key={index} stock={stock} />)
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

export default StockSummary;