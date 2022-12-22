import { BrandIcon, CartIcon, CategoryIcon, StockIcon } from '../shared/icons/icons';
import { StockCardPropsType } from '../../types/stocks.types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';


export type StockDetailsPropsType = {
    modalId: string;
    stock: StockCardPropsType;
    addToCart: () => void;
}


const StockDetailsModal = ({ modalId, stock, addToCart }: StockDetailsPropsType) => {
    const { cart } = useAppSelector(state => state.cartReducer);
    const dispatch = useAppDispatch()

    // current stock selected count
    const currentStock: any = Object.values(cart).filter((item: any) => item.stockId === stock._id)
    return (
        <>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id={modalId} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor={modalId} className="btn btn-primary btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                        <h3 className="text-xl font-bold flex items-center uppercase">
                            <StockIcon iconClass="h-6 w-6 text-primary mr-2" />
                            {stock.name}

                            <div onClick={addToCart} className={`sm:hidden ml-5 indicator ${stock.status === 'out-of-stock' ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                                <span className={`indicator-item badge badge-primary ${stock.status === 'in-stock' ? "badge-primary" : "badge-secondary"}`}>{currentStock[0]?.qty}</span>
                                <CartIcon
                                    iconClass={`hover:scale-125 active:scale-100 transition-all ${stock.status === 'out-of-stock' ? 'cursor-not-allowed text-slate-400' : 'cursor-pointer  text-secondary'} w-6 h-6`}
                                />
                            </div>
                        </h3>

                        <div>
                            <div onClick={addToCart} className={`hidden sm:block mr-10 indicator ${stock.status === 'out-of-stock' ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                                <span className={`indicator-item badge badge-primary ${stock.status === 'in-stock' ? "badge-primary" : "badge-secondary"}`}>{currentStock[0]?.qty}</span>
                                <CartIcon
                                    iconClass={`hover:scale-125 active:scale-100 transition-all ${stock.status === 'out-of-stock' ? 'cursor-not-allowed text-slate-400' : 'cursor-pointer  text-secondary'} w-6 h-6`}
                                />
                            </div>
                        </div>
                    </div>

                    <h5 className={`my-2 sm:mt-0 text-lg badge font-semibold flex items-center mr-10 ${stock.status === 'in-stock' ? "bg-primary border border-primary text-teal-800" : "bg-red-500 border border-red-500 text-white"}`}>
                        {stock.status}
                    </h5>
                    <div className="flex items-center">
                        <h5 className="text-lg text-slate-800 badge  bg-slate-300 py-3 font-semibold flex items-center mt-2">Price</h5>
                        <p className="ml-1 text-lg text-slate-600 font-bold flex items-center">{stock.price} BDT</p>
                    </div>

                    <div className="flex items-center">
                        <h5 className="text-lg text-slate-800 badge  bg-slate-300 py-3 font-semibold flex items-center mt-2">Quantity</h5>
                        <p className="ml-1 text-lg text-slate-600 font-bold flex items-center">{stock.quantity} {stock.unit}</p>
                    </div>

                    <div className="flex items-start sm:items-center">
                        <h5 className="text-lg text-slate-800 badge  bg-slate-300 py-3 font-semibold flex items-center mt-2">Description</h5>
                        <p className="ml-1 text-lg text-slate-600 font-bold flex items-center">{stock.description}</p>
                    </div>

                    <div className="flex flex-col  justify-between">
                        <div className="mt-5 pr-0 sm:pr-10">
                            <h3 className="text-lg uppercase font-bold flex items-center">
                                <BrandIcon iconClass="h-5 w-5 text-primary mr-2" />
                                brand name
                            </h3>
                            <div className="flex flex-wrap space-x-2 sm:flex-row">
                                <h5 className="text-lg text-slate-800 badge  bg-slate-300 py-3 font-semibold flex items-center mt-2">
                                    {stock.brand.name}
                                </h5>
                            </div>
                        </div>
                        <div className="mt-5">
                            <h3 className="text-lg uppercase font-bold flex items-center">
                                <CategoryIcon iconClass="h-5 w-5 text-primary mr-2" />
                                category name
                            </h3>
                            <div className="flex flex-wrap space-x-2 sm:flex-row">
                                <h5 className="text-lg text-slate-800 badge  bg-slate-300 py-3 font-semibold flex items-center mt-2">
                                    {stock.category.name}
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StockDetailsModal;