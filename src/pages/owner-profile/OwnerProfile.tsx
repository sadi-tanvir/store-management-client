import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { useQuery } from '@apollo/client';
import { GET_OWNER_PROFILE } from '../../gql/queries/userAuthQueries';
import { CheckCircleIcon, ContactIcon, EditIcon, EducationIcon, ExperienceIcon } from '../../components/shared/icons/icons';
// import EditUser from './EditUser';
import moment from "moment"
import ProfilePicture from '../../components/owner-profile/ProfilePicture';
import EditUserProfile from '../../components/owner-profile/EditOwnerProfile';
import { GET_BATCHES_BY_USER_REF } from '../../gql/queries/batchQueries';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
    // redux
    const { ownerInfo, accountStatus, role } = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch()

    // router
    const navigate = useNavigate();

    // gql
    const { loading, error, data, refetch } = useQuery(GET_OWNER_PROFILE, {
        variables: { id: ownerInfo._id }
    });
    const batchResponse = useQuery(GET_BATCHES_BY_USER_REF, {
        variables: { id: ownerInfo._id }
    });

    const handleEditBtn = () => {
        dispatch({ type: 'setUserEdit', payload: data?.ownerProfile.owner });
    }
    // moment(parseInt(data?.user.createdAt)).format("DD MMM YYYY hh:mm a")

    useEffect(() => {
        if (data?.ownerProfile.owner) {
            dispatch({ type: 'setOwnerInfo', payload: data?.ownerProfile.owner });
            dispatch({ type: 'accountStatus', payload: data?.ownerProfile.owner.accountStatus });
            dispatch({ type: 'userRole', payload: data?.ownerProfile.owner.role });
            localStorage.setItem('ownerInfo', JSON.stringify(
                {
                    _id: data?.ownerProfile.owner._id,
                    firstName: data?.ownerProfile.owner.firstName,
                    lastName: data?.ownerProfile.owner.lastName,
                    email: data?.ownerProfile.owner.email,
                    phone: data?.ownerProfile.owner.phone,
                    image: data?.ownerProfile.owner.image,
                    gender: data?.ownerProfile.owner.gender,
                    currentAddress: data?.ownerProfile.owner.currentAddress,
                    permanentAddress: data?.ownerProfile.owner.permanentAddress,
                    dateOfBirth: data?.ownerProfile.owner.dateOfBirth,
                    createdAt: data?.ownerProfile.owner.createdAt,
                    updatedAt: data?.ownerProfile.owner.updatedAt,
                }
            ));
        }

    }, [data, dispatch])
    return (
        <>
            <div className="container mx-auto sm:my-5 sm:p-5">
                <div className="md:flex no-wrap md:-mx-2 ">
                    {/* <!-- Left Side --> */}
                    <div className="w-full md:w-3/12 md:mx-2">
                        {/* <!-- Profile Card --> */}
                        <div className="bg-white p-3 flex flex-col justify-center items-center">
                            <ProfilePicture
                                profileImage={ownerInfo?.image}
                                refetch={refetch}
                            />
                            <h1 className="text-gray-900 font-bold text-xl leading-8 flex items-center">
                                {ownerInfo?.firstName} {ownerInfo?.lastName}
                                <span className="ml-1">
                                    {role === 'manager' || role === 'admin' ?
                                        <CheckCircleIcon /> : null
                                    }
                                </span>
                            </h1>
                            <h3 className="text-gray-600 font-lg text-semibold leading-6">Owner of this account.</h3>

                            <ul className="w-full bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                <li className="flex items-center py-2">
                                    <span>Role</span>
                                    <span className="ml-auto">
                                        <span className={`${role === 'admin' ? 'bg-red-300 text-red-500 px-2' : 'bg-teal-200 inline-block px-5 text-teal-500'} py-1 rounded font-bold text-sm`}>
                                            {role}
                                        </span>
                                    </span>
                                </li>
                                <li className="flex items-center py-3">
                                    <span>Status</span>
                                    <span className="ml-auto">
                                        <span className={`${accountStatus !== 'active' ? 'bg-red-300 text-red-500 px-2' : 'bg-teal-200 inline-block px-3 text-teal-500'} py-1 rounded font-bold text-sm`}>
                                            {accountStatus}
                                        </span>
                                    </span>
                                </li>
                                <li className="flex items-center py-3">
                                    <span>Member since</span>
                                    <span className="ml-auto px-[1px]">{moment(parseInt(ownerInfo?.createdAt as string)).format("DD MMM YYYY")}</span>
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
                                    <label onClick={handleEditBtn} htmlFor="Edit-sadi-Modal" className="text-primary hover:text-white flex items-center cursor-pointer space-x-1  btn btn-sm modal-button bg-teal-100">
                                        <EditIcon />
                                        <span className="tracking-wide">Edit</span>
                                    </label>

                                    {/* modal component */}
                                    <EditUserProfile />
                                </div>
                            </div>
                            <div className="text-gray-700">
                                <div className="grid md:grid-cols-2 text-sm">
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-bold">First Name</div>
                                        <div className="px-4 py-2 font-semibold">{ownerInfo?.firstName}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-bold">Last Name</div>
                                        <div className="px-4 py-2 font-semibold">{ownerInfo?.lastName}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-bold">Gender</div>
                                        <div className="px-4 py-2 font-semibold">{ownerInfo?.gender}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-bold">Contact No.</div>
                                        <div className="px-4 py-2 font-semibold">{ownerInfo?.phone}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-bold">Current Address</div>
                                        <div className="px-4 py-2 font-semibold">{ownerInfo?.currentAddress}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-bold">Permanant Address</div>
                                        <div className="px-4 py-2 font-semibold">{ownerInfo?.permanentAddress}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-bold">Email.</div>
                                        <div className="px-4 py-2">
                                            <a className="text-primary font-semibold" href="#">
                                                {ownerInfo?.email}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-bold">Birthday</div>
                                        <div className="px-4 py-2">{ownerInfo?.dateOfBirth}</div>
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
                                                <div onClick={() => navigate(`/individual-batch-details/${batch._id}_${batch.userId._id}`)} className="w-full mt-5 mx-auto flex flex-col gap-2 px-2 bg-white rounded-lg border border-gray-200 shadow-md justify-center items-center cursor-pointer">
                                                    <div className="my-3 w-full mx-auto flex flex-wrap gap-2 py-3 px-2 bg-white min-h-[50px] rounded-lg border border-gray-200 shadow-md justify-start items-center cursor-pointer">
                                                        <span className="flex w-full justify-center font-bold items-center bg-slate-300 text-slate-600 px-3 py-[3px] inline-block rounded border border-gray-200 shadow-sm">
                                                            {batch.batchNo}
                                                            <span className={`${batch.status === 'open' ? 'bg-teal-200 text-teal-700' : 'bg-rose-200 text-rose-600'} ml-3 rounded-full px-3 font-semibold`}>
                                                                {batch.status === 'open' ? 'current' : 'closed'}
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>

                            {/* if batch not available */
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
        </>
    );
};

export default MyProfile;