import React from 'react';
import { CategoryModalPropsType } from '../../../types/dashboard/manageCategory.types';
import { CategoryIcon } from '../../shared/icons/icons';


const CategoryDetailsModal = ({ modalId, category }: CategoryModalPropsType) => {

    return (
        <>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id={modalId} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor={modalId} className="btn btn-primary btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold flex items-center justify-start uppercase">
                            <CategoryIcon iconClass="h-5 w-5 text-primary mr-2" />
                            {category.name} Category
                        </h3>
                    </div>

                    <div className="flex items-center">
                        <h5 className="text-lg text-slate-800 badge  bg-slate-300 py-3 font-semibold flex items-center">Description</h5>
                        <p className="ml-1 text-lg text-slate-600 font-bold flex items-center">{category.description}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryDetailsModal;