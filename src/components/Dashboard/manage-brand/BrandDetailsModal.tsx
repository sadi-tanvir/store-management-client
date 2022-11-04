import React from 'react';
import { BrandIcon, ProductIcon, SupplierIcon } from '../../shared/icons/icons';
import { ManageBrandType } from './ManageBrands';


type BrandModalPropsType = {
    modalId: string;
    brand: ManageBrandType;
}

const BrandDetailsModal = ({ modalId, brand }: BrandModalPropsType) => {
    return (
        <>
            {/* The button to open modal */}
            {/* <label htmlFor="6354c5b37bee4357d30a1e5d" className="btn">open modal</label> */}

            {/* Put this part before </body> tag */}
            <input type="checkbox" id={modalId} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor={modalId} className="btn btn-primary btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold flex items-center">
                        <BrandIcon iconClass="h-5 w-5 text-primary mr-2" />
                        {brand.name}
                    </h3>
                    <div className="flex flex-wrap space-x-2 sm:flex-row">
                        <h5 className="text-lg text-teal-800 badge badge-primary font-semibold flex items-center mt-2">
                            {brand.email}
                        </h5>
                        <h5 className="text-lg text-teal-800 badge badge-primary font-semibold flex items-center mt-2">
                            {brand.phone}
                        </h5>
                        <h5 className={`text-lg badge font-semibold flex items-center mt-2 ${brand.status ? "bg-primary border border-primary text-teal-800" : "bg-red-500 border border-red-500 text-white"}`}>
                            {brand.status}
                        </h5>
                    </div>
                    <h5 className="text-lg text-teal-800 badge badge-primary font-semibold flex items-center mt-2">
                        {brand.website}
                    </h5>
                    <p className="py-4">
                        {brand.description}
                    </p>
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