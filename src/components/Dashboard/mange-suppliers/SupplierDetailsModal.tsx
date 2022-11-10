import { SupplierModalPropsType } from '../../../types/dashboard/manageSuppliers.types';
import { BrandIcon } from '../../shared/icons/icons';



const SupplierDetailsModal = ({ modalId, supplier }: SupplierModalPropsType) => {

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
                                src={supplier.imageUrl}
                                alt="User"
                            />
                            {supplier.name}
                        </h3>
                        <h5 className={`text-lg badge font-semibold flex items-center mr-10 ${supplier.status === 'active' ? "bg-primary border border-primary text-teal-800" : "bg-red-500 border border-red-500 text-white"}`}>
                            {supplier.status}
                        </h5>
                    </div>

                    <div className="flex items-center">
                        <h5 className="text-lg text-slate-800 badge  bg-slate-300 py-3 font-semibold flex items-center mt-2">Email</h5>
                        <p className="ml-1 text-lg text-slate-600 font-bold flex items-center">{supplier.email}</p>
                    </div>

                    <div className="flex items-center">
                        <h5 className="text-lg text-slate-800 badge  bg-slate-300 py-3 font-semibold flex items-center mt-2">Phone</h5>
                        <p className="ml-1 text-lg text-slate-600 font-bold flex items-center">{supplier.contactNumber}</p>
                    </div>

                    <div className="flex items-center">
                        <h5 className="text-lg text-slate-800 badge  bg-slate-300 py-3 font-semibold flex items-center mt-2">Present Address</h5>
                        <p className="ml-1 text-lg text-slate-600 font-bold flex items-center">{supplier.presentAddress}</p>
                    </div>

                    <div className="flex items-center">
                        <h5 className="text-lg text-slate-800 badge  bg-slate-300 py-3 font-semibold flex items-center mt-2">Permanent Address</h5>
                        <p className="ml-1 text-lg text-slate-600 font-bold flex items-center">{supplier.permanentAddress}</p>
                    </div>
                    <div className="mt-5">
                        <h3 className="text-lg font-bold flex items-center">
                            <BrandIcon iconClass="h-5 w-5 text-primary mr-2" />
                            brand name
                        </h3>
                        <div className="flex flex-wrap space-x-2 sm:flex-row">
                            <h5 className="text-lg text-slate-800 badge  bg-slate-300 py-3 font-semibold flex items-center mt-2">
                                {supplier.brand.id.name}
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SupplierDetailsModal;