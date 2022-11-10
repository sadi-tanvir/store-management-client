import React from 'react';
import { ProductModalPropsType } from '../../../types/dashboard/manageProduct.types';




const ProductDetailsModal = ({ modalId, product }: ProductModalPropsType) => {

    return (
        <>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id={modalId} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor={modalId} className="btn btn-primary btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold flex items-center justify-start uppercase">
                            <img
                                className="w-8 h-8 rounded-full shadow-lg mr-2"
                                src={product.imageUrl}
                                alt="User"
                            />
                            {product.name}
                        </h3>
                        {/* <h5 className={`text-lg badge font-semibold flex items-center mr-10 ${brand.status ? "bg-primary border border-primary text-teal-800" : "bg-red-500 border border-red-500 text-white"}`}>
                            {brand.status}
                        </h5> */}
                    </div>

                    <div className="flex items-center">
                        <h5 className="text-lg text-slate-800 badge  bg-slate-300 py-3 font-semibold flex items-center mt-2">Brand</h5>
                        <p className="ml-1 text-lg text-slate-600 font-bold flex items-center">{product.brand.id.name}</p>
                    </div>

                    <div className="flex items-center">
                        <h5 className="text-lg text-slate-800 badge  bg-slate-300 py-3 font-semibold flex items-center mt-2">Category</h5>
                        <p className="ml-1 text-lg text-slate-600 font-bold flex items-center">{product.category.id.name}</p>
                    </div>

                    <div className="flex items-center">
                        <h5 className="text-lg text-slate-800 badge  bg-slate-300 py-3 font-semibold flex items-center mt-2">Unit Type</h5>
                        <p className="ml-1 text-lg text-slate-600 font-bold flex items-center">{product.unit}</p>
                    </div>

                    <div className="flex items-center">
                        <h5 className="text-lg text-slate-800 badge  bg-slate-300 py-3 font-semibold flex items-center mt-2">Description</h5>
                        <p className="ml-1 text-lg text-slate-600 font-bold flex items-center">{product.description}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetailsModal;