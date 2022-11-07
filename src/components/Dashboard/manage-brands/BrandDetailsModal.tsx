import React from 'react';
import { BrandModalPropsType } from '../../../types/dashboard/manageBrands.types';
import { BrandIcon, ProductIcon, SupplierIcon } from '../../shared/icons/icons';




const BrandDetailsModal = ({ modalId, brand }: BrandModalPropsType) => {

    return (
        <>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id={modalId} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor={modalId} className="btn btn-primary btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold flex items-center uppercase">
                            <BrandIcon iconClass="h-6 w-6 text-primary mr-2" />
                            {brand.name}
                        </h3>
                        <h5 className={`text-lg badge font-semibold flex items-center mr-10 ${brand.status ? "bg-primary border border-primary text-teal-800" : "bg-red-500 border border-red-500 text-white"}`}>
                            {brand.status}
                        </h5>
                    </div>

                    <div className="flex items-center">
                        <h5 className="text-lg text-teal-700 badge badge-primary font-bold flex items-center">Email</h5>
                        <p className="ml-1 text-lg text-slate-600 font-bold flex items-center">{brand.email}</p>
                    </div>

                    <div className="flex items-center">
                        <h5 className="text-lg text-teal-700 badge badge-primary font-bold flex items-center">Phone</h5>
                        <p className="ml-1 text-lg text-slate-600 font-bold flex items-center">{brand.phone}</p>
                    </div>

                    <div className="flex items-center">
                        <h5 className="text-lg text-teal-700 badge badge-primary font-semibold flex items-center">Website</h5>
                        <p className="ml-1 text-lg text-slate-600 font-bold flex items-center">{brand.website}</p>
                    </div>

                    <div className="flex my-2">
                        <h5 className="mt-1 text-lg text-teal-700 badge badge-primary font-semibold flex items-center">Description</h5>
                        <p className="ml-1 text-lg text-slate-600 font-semibold flex items-center">{brand.description}</p>
                    </div>

                    <h5 className="text-lg text-teal-600 font-semibold flex items-center">
                        {brand.location}
                    </h5>

                    {/* showing products */}
                    <div className="my-3">
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default BrandDetailsModal;