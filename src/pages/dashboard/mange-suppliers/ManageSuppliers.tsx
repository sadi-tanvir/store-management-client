import { useMutation, useQuery } from '@apollo/client';
import Swal from 'sweetalert2';
import { GET_BRANDS_2 } from '../../../gql/queries/brandQueries';
import TableHeader from "../../../components/shared/components/TableHeader";
import { BrandIcon, EyesIcon, TableDeleteIcon, TableEditIcon } from '../../../components/shared/icons/icons';
import { GET_SUPPLIERS_WITH_DETAILS } from '../../../gql/queries/supplierQueries';
import { DELETE_SUPPLIER_MUTATION } from '../../../gql/mutations/supplierMutation';
import UpdateSupplierModal from '../../../components/Dashboard/mange-suppliers/UpdateSupplierModal';
import SupplierDetailsModal from '../../../components/Dashboard/mange-suppliers/SupplierDetailsModal';
import { ManageSupplierType } from '../../../types/dashboard/manageSuppliers.types';
import Breadcrumbs from '../../../components/shared/components/Breadcrumbs';
import ReactHelmet from '../../../components/shared/components/ReactHelmet';



const ManageSuppliers = () => {
    // gql
    const brandResponse = useQuery(GET_BRANDS_2);
    const supplierResponse = useQuery(GET_SUPPLIERS_WITH_DETAILS);
    const [deleteSupplierMutation] = useMutation(DELETE_SUPPLIER_MUTATION, {
        refetchQueries: [GET_SUPPLIERS_WITH_DETAILS],
    });

    // handle Delete Brand
    const handleDeleteSupplier = (id: string) => {
        Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#14b8a6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Delete it!' })
            .then((result) => {
                if (result.isConfirmed) {
                    deleteSupplierMutation({
                        variables: {
                            id: id
                        }
                    })
                }
            })
    }

    return (
        <>
            <div className="px-5">
                <Breadcrumbs firstPath="/dashboard" firstName="Dashboard" current="Manage Suppliers" />
                <ReactHelmet title={'Manage Suppliers'} />
            </div>
            <div className="w-full">
                <TableHeader headers={["name", "phone", "brand", "status", "actions"]}>
                    {supplierResponse?.data?.suppliers.map((supplier: ManageSupplierType, index: number) => {
                        return (
                            <>
                                <tr key={supplier._id}>
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="mr-2">
                                                <img
                                                    className="w-8 h-8 rounded-full shadow-lg mr-2"
                                                    src={supplier.imageUrl}
                                                    alt="User"
                                                />
                                            </div>
                                            <span className="font-medium flex flex-col justify-start">
                                                {supplier.name.length > 15 ? `${supplier.name.substring(0, 15)}..` : supplier.name}
                                                <br />
                                                <span>
                                                    {supplier.email.length > 15 ? `${supplier.email.substring(0, 15)}..` : supplier.email}
                                                </span>
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <div className="flex items-center">
                                            <div className="mr-2">
                                                <BrandIcon iconClass="h-5 w-5 text-primary" />
                                            </div>
                                            <span className='text-sm font-semibold'>
                                                {supplier.contactNumber.length > 12 ? `${supplier.contactNumber.substring(0, 10)} ...` : supplier.contactNumber}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex items-center justify-start">
                                            <span className='text-sm font-semibold'>
                                                {supplier?.brand?.id?.name.length > 25 ? `${supplier.brand?.id?.name.substring(0, 10)} ...` : supplier.brand?.id?.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex items-center justify-start">
                                            <span className={`${supplier.status === 'active' ? 'bg-teal-200 text-teal-600' : 'bg-red-200 text-red-600'} font-semibold py-1 px-3 rounded-full text-xs`}>
                                                {supplier.status}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="py-3 px-6 text-center">
                                        <div className="flex item-center justify-start">
                                            <div className="w-4 mr-2 cursor-pointer transform hover:text-primary hover:scale-110">
                                                <label className="cursor-pointer" htmlFor={`details-${supplier._id}`}>
                                                    <EyesIcon />
                                                </label>
                                            </div>
                                            <div className="w-4 mr-2 cursor-pointer transform hover:text-primary hover:scale-110">
                                                <label className="cursor-pointer" htmlFor={`update-${supplier._id}`}>
                                                    <TableEditIcon />
                                                </label>
                                            </div>
                                            <div className="w-4 mr-2 cursor-pointer transform hover:text-red-500 hover:scale-110">
                                                <label onClick={() => handleDeleteSupplier(supplier._id)} className="cursor-pointer">
                                                    <TableDeleteIcon />
                                                </label>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <SupplierDetailsModal
                                    modalId={`details-${supplier._id}`}
                                    supplier={supplier}
                                />
                                <UpdateSupplierModal
                                    header="Update Supplier"
                                    modalId={`update-${supplier._id}`}
                                    currentSupplier={supplier}
                                    brands={brandResponse?.data?.brands}
                                />
                            </>
                        )
                    })}
                </TableHeader>
            </div >
        </>
    );
};

export default ManageSuppliers;