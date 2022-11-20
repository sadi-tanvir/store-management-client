import { useMutation, useQuery } from '@apollo/client';
import Swal from 'sweetalert2';
import { useAppDispatch } from '../../../redux/hooks/hooks';
import TableHeader from "../../../components/shared/components/TableHeader";
import { CategoryIcon, EyesIcon, TableDeleteIcon, TableEditIcon } from '../../../components/shared/icons/icons';
import { GET_CATEGORIES } from '../../../gql/queries/categoryQueries';
import CategoryDetailsModal from '../../../components/Dashboard/manage-categories/CategoryDetailsModal';
import UpdateCategoryModal from '../../../components/Dashboard/manage-categories/UpdateCategoryModal';
import { DELETE_CATEGORY_MUTATION } from '../../../gql/mutations/categoryMutation';
import { ManageCategoryType } from '../../../types/dashboard/manageCategory.types';


const ManageCategories = () => {
    // gql
    const categoryResponse = useQuery(GET_CATEGORIES);
    const [deleteCategoryMutation] = useMutation(DELETE_CATEGORY_MUTATION, {
        refetchQueries: [GET_CATEGORIES],
    });

    // handle Delete Brand
    const handleDeleteProduct = (id: string) => {
        Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#14b8a6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Delete it!' })
            .then((result) => {
                if (result.isConfirmed) {
                    deleteCategoryMutation({
                        variables: {
                            id: id
                        }
                    })
                }
            })
    }

    return (
        <>
            <div className="w-full">
                <TableHeader headers={["name", "description", "actions"]}>
                    {categoryResponse?.data?.categories.map((category: ManageCategoryType, index: number) => {
                        return (
                            <>
                                <tr key={category._id}>
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="mr-2">
                                                <CategoryIcon iconClass="h-5 w-5 text-primary" />
                                            </div>
                                            <span className="font-medium">
                                                {category.name.length > 15 ? `${category.name.substring(0, 15)}..` : category.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <div className="flex items-center">
                                            {/* <div className="mr-2">
                                                <BrandIcon iconClass="h-5 w-5 text-primary" />
                                            </div> */}
                                            <span className='text-sm font-semibold'>
                                                {category.description.length > 25 ? `${category.description.substring(0, 20)} ...` : category.description}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="py-3 px-6 text-center">
                                        <div className="flex item-center justify-start">
                                            <div className="w-4 mr-2 cursor-pointer transform hover:text-primary hover:scale-110">
                                                <label className="cursor-pointer" htmlFor={`details-${category._id}`}>
                                                    <EyesIcon />
                                                </label>
                                            </div>
                                            <div className="w-4 mr-2 cursor-pointer transform hover:text-primary hover:scale-110">
                                                <label className="cursor-pointer" htmlFor={`update-${category._id}`}>
                                                    <TableEditIcon />
                                                </label>
                                            </div>
                                            <div className="w-4 mr-2 cursor-pointer transform hover:text-red-500 hover:scale-110">
                                                <label onClick={() => handleDeleteProduct(category._id)} className="cursor-pointer">
                                                    <TableDeleteIcon />
                                                </label>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <CategoryDetailsModal
                                    modalId={`details-${category._id}`}
                                    category={category}
                                />
                                <UpdateCategoryModal
                                    header="Update Category"
                                    modalId={`update-${category._id}`}
                                    currentCategory={category}
                                />
                            </>
                        )
                    })}

                </TableHeader>
            </div >
        </>
    );
};

export default ManageCategories;