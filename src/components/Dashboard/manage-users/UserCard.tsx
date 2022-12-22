/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { useNavigate } from "react-router-dom"
import { useMutation } from '@apollo/client';
import { GET_USERS } from '../../../gql/queries/userAuthQueries';
import Swal from 'sweetalert2';
import { USER_DELETE_BY_ID_MUTATION } from '../../../gql/mutations/userAuthMutations';
import { ApiBaseUrl } from '../../utilities/ApiBaseUrl';
import { CheckCircleIcon } from '../../shared/icons/icons';
import { DashboardUserType } from "../../../types/dashboard/mangeUsers.types";

const UserCard = ({ user }: { user: DashboardUserType }) => {
    // gql
    const [deleteUserMutation, { data, loading, error }] = useMutation(USER_DELETE_BY_ID_MUTATION, {
        refetchQueries: [GET_USERS],
    });

    // router
    const navigate = useNavigate();

    // handle delete user
    const handleDeleteUser = () => {
        Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#14b8a6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Delete it!' })
            .then((result) => {
                if (result.isConfirmed) {
                    deleteUserMutation({
                        variables: {
                            id: user?._id
                        }
                    })
                }
            })
    }

    const fullName = `${user.firstName} ${user.lastName}`;

    return (
        <>

            <div className="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-darkSecondary dark:border-gray-700 px-3">
                {/* drop down start */}
                <div className="flex justify-end pt-1">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="">
                            <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                                <span className="sr-only">Open dropdown</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
                            </button>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-1 p-2 shadow bg-base-100 dark:bg-darkPrimary rounded-b-2xl rounded-t-lg w-52">
                            <li onClick={() => navigate(`/user/${user?._id}`)}><a className="dark:text-darkNeutral">Details</a></li>
                            <li onClick={() => navigate(`/create-batch-form/${user?._id}`)}><a className="dark:text-darkNeutral">Create New Batch</a></li>
                            <li onClick={handleDeleteUser}><a className="text-red-400">Delete</a></li>
                        </ul>
                    </div>
                </div> {/* drop down end */}

                <div className="flex items-center -mt-5 pb-5">
                    <img
                        className="mb-3 w-12 h-12 rounded-full shadow-lg"
                        src={user.image ? `${ApiBaseUrl}/profile-pic/${user?.image}` : `https://t3.ftcdn.net/jpg/02/43/51/48/360_F_243514868_XDIMJHNNJYKLRST05XnnTj0MBpC4hdT5.jpg`}
                        alt="User image"
                    />
                    <div className="flex flex-col items-start ml-2">
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white cursor-not-allowed flex items-center">
                            <div className="tooltip tooltip-primary mr-1" data-tip={fullName}>
                                {fullName.length > 15 ? `${fullName.substring(0, 15)}... ` : fullName}
                            </div>
                            {user?.role === 'manager' || user?.role === 'admin' ?
                                <CheckCircleIcon /> : null
                            }
                        </h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400 cursor-not-allowed">
                            <div className="tooltip tooltip-primary" data-tip={user.email}>
                                {user.email.length > 20 ? `${user.email.substring(0, 20)}...` : user.email}
                            </div>
                        </span>
                    </div>
                </div>
            </div>

        </>
    );
};

export default UserCard;