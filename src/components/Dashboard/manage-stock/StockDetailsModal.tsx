import React from 'react';
import { BrandModalPropsType } from '../../../types/dashboard/manageBrands.types';
import { BrandIcon, CategoryIcon, ProductIcon, StockIcon, SupplierIcon } from '../../shared/icons/icons';

export type StockCommonType = {
    id: {
        _id: string;
        name: string;
    }
}

export type ManageStockType = {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    status: string;
    unit: string;
    quantity: number;
    sellCount: number;
    category: StockCommonType;
    brand: StockCommonType;
    suppliedBy: StockCommonType;
}

export type StockDetailsPropsType = {
    modalId: string;
    stock: ManageStockType;
}

const StockDetailsModal = ({ modalId, stock }: StockDetailsPropsType) => {

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
                            {stock.name}
                        </h3>
                        <h5 className={`text-lg badge font-semibold flex items-center mr-10 ${stock.status === 'in-stock' ? "bg-primary border border-primary text-teal-800" : "bg-red-500 border border-red-500 text-white"}`}>
                            {stock.status}
                        </h5>
                    </div>

                    <div className="flex items-center">
                        <h5 className="text-lg text-slate-800 badge  bg-slate-300 py-3 font-semibold flex items-center mt-2">Price</h5>
                        <p className="ml-1 text-lg text-slate-600 font-bold flex items-center">{stock.price}</p>
                    </div>

                    <div className="flex items-center">
                        <h5 className="text-lg text-slate-800 badge  bg-slate-300 py-3 font-semibold flex items-center mt-2">Quantity</h5>
                        <p className="ml-1 text-lg text-slate-600 font-bold flex items-center">{stock.quantity} {stock.unit}</p>
                    </div>

                    <div className="flex items-center">
                        <h5 className="text-lg text-slate-800 badge  bg-slate-300 py-3 font-semibold flex items-center mt-2">Total Sell</h5>
                        <p className="ml-1 text-lg text-slate-600 font-bold flex items-center">{stock.sellCount} {stock.unit}</p>
                    </div>

                    <div className="flex items-center">
                        <h5 className="text-lg text-slate-800 badge  bg-slate-300 py-3 font-semibold flex items-center mt-2">Unit Type</h5>
                        <p className="ml-1 text-lg text-slate-600 font-bold flex items-center">{stock.unit}</p>
                    </div>

                    <div className="flex items-center">
                        <h5 className="text-lg text-slate-800 badge  bg-slate-300 py-3 font-semibold flex items-center mt-2">Description</h5>
                        <p className="ml-1 text-lg text-slate-600 font-bold flex items-center">{stock.description}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between">
                        <div className="mt-5">
                            <h3 className="text-lg font-bold flex items-center">
                                <CategoryIcon iconClass="h-5 w-5 text-primary mr-2" />
                                category name
                            </h3>
                            <div className="flex flex-wrap space-x-2 sm:flex-row">
                                <h5 className="text-lg text-slate-800 badge  bg-slate-300 py-3 font-semibold flex items-center mt-2">
                                    {stock.category.id.name}
                                </h5>
                            </div>
                        </div>

                        <div className="mt-5 pr-0 sm:pr-10">
                            <h3 className="text-lg font-bold flex items-center">
                                <BrandIcon iconClass="h-5 w-5 text-primary mr-2" />
                                brand name
                            </h3>
                            <div className="flex flex-wrap space-x-2 sm:flex-row">
                                <h5 className="text-lg text-slate-800 badge  bg-slate-300 py-3 font-semibold flex items-center mt-2">
                                    {stock.brand.id.name}
                                </h5>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5">
                        <h3 className="text-lg font-bold flex items-center">
                            <SupplierIcon iconClass="h-5 w-5 text-primary mr-2" />
                            Supplier name
                        </h3>
                        <div className="flex flex-wrap space-x-2 sm:flex-row">
                            <h5 className="text-lg text-slate-800 badge  bg-slate-300 py-3 font-semibold flex items-center mt-2">
                                {stock.suppliedBy.id.name}
                            </h5>
                        </div>
                    </div>


                    {/* showing products */}
                    {/* <div className="my-3">
                        <h3 className="text-lg font-bold flex items-center">
                            <ProductIcon iconClass="h-5 w-5 text-primary mr-2" />
                            products of this brand
                        </h3>
                        <div className="flex flex-wrap space-x-2 sm:flex-row">
                            {
                                brand.products.map((product, index) => {
                                    return <h5 className="text-lg text-slate-800 badge  bg-slate-300  py-3 font-semibold flex items-center mt-2">
                                        {product.name}
                                    </h5>
                                })
                            }
                        </div>
                    </div>
                    <div className="mt-5">
                        <h3 className="text-lg font-bold flex items-center">
                            <SupplierIcon iconClass="h-5 w-5 text-primary mr-2" />
                            suppliers of this brand
                        </h3>
                        <div className="flex flex-wrap space-x-2 sm:flex-row">
                            {
                                brand.suppliers.map((supplier, index) => {
                                    return <h5 className="text-lg text-slate-800 badge  bg-slate-300 py-3 font-semibold flex items-center mt-2">
                                        {supplier.id.name}
                                    </h5>
                                })
                            }
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default StockDetailsModal;