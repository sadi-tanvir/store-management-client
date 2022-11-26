import { OrderDetailsPropsType } from '../../../types/dashboard/manageBatch.types';
import { CurrencyBDIcon, StockIcon, SupplierIcon } from '../../shared/icons/icons';



const OrderDetailsModal = ({ modalId, order }: OrderDetailsPropsType) => {

    return (
        <>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id={modalId} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor={modalId} className="btn btn-primary btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold flex items-center uppercase">
                            <StockIcon iconClass="h-6 w-6 text-primary mr-2" />
                            {order._id}
                        </h3>
                        <span className='text-lg bg-teal-200 text-teal-600 px-2 font-bold mr-5 rounded-full'>{order.batchRef.batchNo}</span>
                    </div>

                    <div className="flex items-center">
                        <h5 className="text-xl text-slate-800 badge  bg-slate-300 py-3 font-semibold flex items-center">Total Amount</h5>
                        <p className="ml-1 text-xl text-slate-600 font-bold flex items-center">
                            <CurrencyBDIcon iconClass="w-6 h-6" />
                            {order.amount}
                        </p>
                    </div>

                    <div className="flex items-center mt-2">
                        <h5 className="text-xl text-slate-800 badge  bg-slate-300 py-3 font-semibold flex items-center">Payment Status</h5>
                        <p className="ml-1 text-xl text-slate-600 font-bold flex items-center uppercase">
                            {order.paymentStatus}
                        </p>
                    </div>

                    <div className="flex items-center mt-2">
                        <h5 className="text-xl text-slate-800 badge  bg-slate-300 py-3 font-semibold flex items-center">Order Status</h5>
                        <p className="ml-1 text-xl text-slate-600 font-bold flex items-center uppercase">
                            {order.orderStatus}
                        </p>
                    </div>

                    <div className="flex items-center mt-2">
                        <h5 className="text-xl text-slate-800 badge  bg-slate-300 py-3 font-semibold flex items-center">Trx Id</h5>
                        <p className="ml-1 text-xl text-slate-600 font-bold flex items-center uppercase">
                            {order.trxId ? order.trxId : "N/A"}
                        </p>
                    </div>

                    <div className="mt-5">
                        <h3 className="text-2xl font-bold flex items-center mb-2">
                            <SupplierIcon iconClass="h-6 w-6 text-primary mr-2" />
                            Customer's Information
                        </h3>
                        <div className="flex flex-wrap space-x-2 sm:flex-row mt-2">
                            <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
                                <div className="collapse-title text-xl font-medium uppercase">
                                    Customer's Information
                                </div>
                                <div className="collapse-content">
                                    <div className="flex items-center">
                                        <span className="text-lg font-bold">
                                            Email :
                                        </span>
                                        <p className="ml-1 text-lg text-slate-600 font-bold flex items-center">
                                            {order.email}
                                        </p>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-lg font-bold">
                                            Phone :
                                        </span>
                                        <p className="ml-1 text-lg text-slate-600 font-bold flex items-center">
                                            {order.phone}
                                        </p>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-lg font-bold">
                                            Address :
                                        </span>
                                        <p className="ml-1 text-lg text-slate-600 font-bold flex items-center">
                                            {order.address}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5">
                        <h3 className="text-2xl font-bold flex items-center mb-2">
                            <SupplierIcon iconClass="h-6 w-6 text-primary mr-2" />
                            Products
                        </h3>
                        {
                            order.products.map((product) => {
                                return (
                                    <>
                                        <div className="flex flex-wrap space-x-2 sm:flex-row mt-2">
                                            <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
                                                <div className="collapse-title text-xl font-medium uppercase">
                                                    {product.name}
                                                </div>
                                                <div className="collapse-content">
                                                    <div className="flex items-center">
                                                        <span className="text-lg font-bold">
                                                            Order Id :
                                                        </span>
                                                        <p className="ml-1 text-lg text-slate-600 font-bold flex items-center">
                                                            {product._id}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-lg font-bold">
                                                            Brand :
                                                        </span>
                                                        <p className="ml-1 text-lg text-slate-600 font-bold flex items-center">
                                                            {product.brand}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-lg font-bold">
                                                            Category :
                                                        </span>
                                                        <p className="ml-1 text-lg text-slate-600 font-bold flex items-center">
                                                            {product.category}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-lg font-bold">
                                                            Price :
                                                        </span>
                                                        <p className="ml-1 text-lg text-slate-600 font-bold flex items-center">
                                                            {product.price}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-lg font-bold">
                                                            Qty :
                                                        </span>
                                                        <p className="ml-1 text-lg text-slate-600 font-bold flex items-center">
                                                            {product.qty} {product.unit}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderDetailsModal;