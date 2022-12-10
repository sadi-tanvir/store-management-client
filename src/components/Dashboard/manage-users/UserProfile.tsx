import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hooks';
import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../../../gql/queries/userAuthQueries';
import { CheckCircleIcon, ContactIcon, EditIcon, EducationIcon, ExperienceIcon } from '../../shared/icons/icons';
import EditUser from './EditUser';
import moment from "moment"
import ProfilePicture from './ProfilePicture';
import { GET_BATCHES_BY_USER_REF } from '../../../gql/queries/batchQueries';
import Breadcrumbs from '../../shared/components/Breadcrumbs';
import ReactHelmet from '../../shared/components/ReactHelmet';
import classes from "../../styles/global-style/global.module.css"
import BatchCard from './BatchCard';
import PasswordChange from './PasswordChange';

const UserProfile = () => {
    // redux
    const dispatch = useAppDispatch()

    // router
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // apollo server
    const { loading, error, data, refetch } = useQuery(GET_USER_BY_ID, {
        variables: { id: id }
    });
    // gql
    const batchResponse = useQuery(GET_BATCHES_BY_USER_REF, {
        variables: { id: id }
    });

    const handleEditBtn = () => {
        dispatch({ type: 'setUserEdit', payload: data?.userById });
    }
    // moment(parseInt(data?.user.createdAt)).format("DD MMM YYYY hh:mm a")
    return (
        <>
            <div className={`w-full min-h-screen ${classes.global_background}`}>
                <div className={`min-h-screen bg-slate-200 opacity-[0.80] pt-24`}>
                    <div className="px-5">
                        <Breadcrumbs firstPath="/dashboard" firstName="Dashboard" secondPath="/dashboard/manage-users" secondName="Users" current="User's Profile" />
                        <ReactHelmet title={'User\'s Profile'} />
                    </div>
                    <div className={`container mx-auto sm:my-5 sm:p-5`}>
                        <div className="md:flex no-wrap md:-mx-2 ">
                            {/* <!-- Left Side --> */}
                            <div className="w-full md:w-3/12 md:mx-2">
                                {/* <!-- Profile Card --> */}
                                <div className="bg-white p-3 flex flex-col justify-center items-center">
                                    <ProfilePicture
                                        profileImage={data?.userById.image}
                                    />
                                    <h1 className="text-gray-900 font-bold text-xl leading-8 my-1 flex items-center">
                                        {data?.userById?.firstName} {data?.userById?.lastName}
                                        <span className="ml-1">
                                            {data?.userById?.role === 'manager' || data?.userById?.role === 'admin' ?
                                                <CheckCircleIcon /> : null
                                            }
                                        </span>
                                    </h1>
                                    <h3 className="text-gray-600 font-lg text-semibold leading-6">Owner of this account.</h3>

                                    <ul className="w-full bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                        <li className="flex items-center py-2">
                                            <span>Role</span>
                                            <span className="ml-auto">
                                                <span className={`${data?.userById?.role === 'admin' ? 'bg-red-300 text-red-500 px-2' : 'bg-teal-200 inline-block px-5 text-teal-500'} py-1 rounded font-bold text-sm`}>
                                                    {data?.userById?.role}
                                                </span>
                                            </span>
                                        </li>
                                        <li className="flex items-center py-3">
                                            <span>Status</span>
                                            <span className="ml-auto">
                                                <span className={`${data?.userById?.accountStatus !== 'active' ? 'bg-red-300 text-red-500 px-2' : 'bg-teal-200 inline-block px-3 text-teal-500'} py-1 rounded font-bold text-sm`}>
                                                    {data?.userById?.accountStatus}
                                                </span>
                                            </span>
                                        </li>
                                        <li className="flex items-center py-3">
                                            <span>Member since</span>
                                            <span className="ml-auto px-[1px]">{moment(parseInt(data?.userById.createdAt)).format("DD MMM YYYY")}</span>
                                        </li>
                                    </ul>
                                </div>
                                {/* <!-- End of profile card --> */}
                            </div>
                            {/* left side end */}


                            {/* <!-- Right Side --> */}
                            <div className="w-full md:w-9/12 mx-2 h-64">
                                {/* <!-- Profile tab --> */}
                                {/* <!-- About Section --> */}
                                <div className="bg-white p-3 shadow rounded-sm">
                                    <div className="flex items-center justify-between font-semibold text-gray-900 leading-8">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-primary">
                                                <ContactIcon />
                                            </span>
                                            <span className="tracking-wide">About</span>
                                        </div>
                                        <div className="flex items-center space-x-1 cursor-pointer">
                                            <label onClick={handleEditBtn} htmlFor="Edit-User-Modal" className="text-primary hover:text-white flex items-center cursor-pointer space-x-1  btn btn-sm modal-button bg-teal-100">
                                                <EditIcon />
                                                <span className="tracking-wide">Edit</span>
                                            </label>

                                            {/* modal component */}
                                            <EditUser />
                                        </div>
                                    </div>
                                    <div className="text-gray-700">
                                        <div className="grid md:grid-cols-2 text-sm">
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-bold">First Name</div>
                                                <div className="px-4 py-2 font-semibold">{data?.userById?.firstName}</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-bold">Last Name</div>
                                                <div className="px-4 py-2 font-semibold">{data?.userById?.lastName}</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-bold">Gender</div>
                                                <div className="px-4 py-2 font-semibold">{data?.userById?.gender}</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-bold">Contact No.</div>
                                                <div className="px-4 py-2 font-semibold">{data?.userById?.phone}</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-bold">Current Address</div>
                                                <div className="px-4 py-2 font-semibold">{data?.userById?.currentAddress}</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-bold">Permanant Address</div>
                                                <div className="px-4 py-2 font-semibold">{data?.userById?.permanentAddress}</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-bold">Email.</div>
                                                <div className="px-4 py-2">
                                                    <a className="text-primary font-semibold" href="#">
                                                        {data?.userById?.email}
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-bold">Birthday</div>
                                                <div className="px-4 py-2">{data?.userById?.dateOfBirth}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- End of about section --> */}

                                <div className="my-4"></div>

                                {/* <!-- Showing all batches --> */}
                                <div className="bg-white p-3 shadow-sm rounded-sm">
                                    <h1 className='text-2xl text-secondary font-bold'>All Batches</h1>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-3">
                                        {
                                            batchResponse?.data?.getBatchesByUserRef?.map((batch: any) => {
                                                return (
                                                    <>
                                                        <BatchCard batch={batch} />
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                    {
                                        batchResponse?.data?.getBatchesByUserRef.length === 0 &&
                                        <div className="w-full min-h-[200px] flex justify-center items-center">
                                            <span className="text-xl sm:text-2xl font-bold text-secondary opacity-70">
                                                Batch Not Available
                                            </span>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfile;