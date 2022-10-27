import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hooks';
import { useParams } from "react-router-dom"
import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../../../gql/queries/userAuthQueries';
import { ContactIcon, EditIcon, EducationIcon, ExperienceIcon } from '../../shared/icons/icons';
import EditUser from './EditUser';
import moment from "moment"

const UserProfile = () => {
    // redux
    // const editInfo = useAppSelector(state => state.userEditReducer);

    // redux
    const dispatch = useAppDispatch()

    // router
    const { id } = useParams<{ id: string }>();

    // apollo server
    const { loading, error, data } = useQuery(GET_USER_BY_ID, {
        variables: { id: id }
    });

    const handleEditBtn = () => {
        dispatch({ type: 'setUserEdit', payload: data?.user });
    }
    // moment(parseInt(data?.user.createdAt)).format("DD MMM YYYY hh:mm a")
    return (
        <>
            <div className="container mx-auto my-5 p-5">
                <div className="md:flex no-wrap md:-mx-2 ">
                    {/* <!-- Left Side --> */}
                    <div className="w-full md:w-3/12 md:mx-2">
                        {/* <!-- Profile Card --> */}
                        <div className="bg-white p-3 flex flex-col justify-center items-center">
                            <div className="image overflow-hidden">
                                <div className="avatar online">
                                    <div className="w-44 border shadow-md rounded-full">
                                        <img className="h-auto w-full block mx-auto"
                                            src="https://i.ibb.co/jgDtzL8/empty-avatar.jpg"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                                {data?.user?.firstName} {data?.user?.lastName}
                            </h1>
                            <h3 className="text-gray-600 font-lg text-semibold leading-6">Owner of this account.</h3>

                            <ul className="w-full bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                <li className="flex items-center py-2">
                                    <span>Role</span>
                                    <span className="ml-auto">
                                        <span className={`${data?.user?.role === 'admin' ? 'bg-red-300 text-red-500 px-2' : 'bg-teal-200 inline-block px-5 text-teal-500'} py-1 rounded font-bold text-sm`}>
                                            {data?.user?.role}
                                        </span>
                                    </span>
                                </li>
                                <li className="flex items-center py-3">
                                    <span>Status</span>
                                    <span className="ml-auto">
                                        <span className={`${data?.user?.accountStatus !== 'active' ? 'bg-red-300 text-red-500 px-2' : 'bg-teal-200 inline-block px-3 text-teal-500'} py-1 rounded font-bold text-sm`}>
                                            {data?.user?.accountStatus}
                                        </span>
                                    </span>
                                </li>
                                <li className="flex items-center py-3">
                                    <span>Member since</span>
                                    <span className="ml-auto px-[1px]">{moment(parseInt(data?.user.createdAt)).format("DD MMM YYYY")}</span>
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
                                        <div className="px-4 py-2 font-semibold">{data?.user?.firstName}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-bold">Last Name</div>
                                        <div className="px-4 py-2 font-semibold">{data?.user?.lastName}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-bold">Gender</div>
                                        <div className="px-4 py-2 font-semibold">{data?.user?.gender}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-bold">Contact No.</div>
                                        <div className="px-4 py-2 font-semibold">{data?.user?.phone}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-bold">Current Address</div>
                                        <div className="px-4 py-2 font-semibold">{data?.user?.currentAddress}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-bold">Permanant Address</div>
                                        <div className="px-4 py-2 font-semibold">{data?.user?.permanentAddress}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-bold">Email.</div>
                                        <div className="px-4 py-2">
                                            <a className="text-primary font-semibold" href="#">
                                                {data?.user?.email}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-bold">Birthday</div>
                                        <div className="px-4 py-2">{data?.user?.dateOfBirth}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- End of about section --> */}

                        <div className="my-4"></div>

                        {/* <!-- Experience and education --> */}
                        <div className="bg-white p-3 shadow-sm rounded-sm">

                            <div className="grid grid-cols-2">
                                <div>
                                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                        <span className="text-primary">
                                            <ExperienceIcon />
                                        </span>
                                        <span className="tracking-wide">Experience</span>
                                    </div>
                                    <ul className="list-inside space-y-2">
                                        <li>
                                            <div className="text-teal-600">Owner at Her Company Inc.</div>
                                            <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                        </li>
                                        <li>
                                            <div className="text-teal-600">Owner at Her Company Inc.</div>
                                            <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                        </li>
                                        <li>
                                            <div className="text-teal-600">Owner at Her Company Inc.</div>
                                            <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                        </li>
                                        <li>
                                            <div className="text-teal-600">Owner at Her Company Inc.</div>
                                            <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                        <span className="text-primary">
                                            <EducationIcon />
                                        </span>
                                        <span className="tracking-wide">Education</span>
                                    </div>
                                    <ul className="list-inside space-y-2">
                                        <li>
                                            <div className="text-teal-600">Masters Degree in Oxford</div>
                                            <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                        </li>
                                        <li>
                                            <div className="text-teal-600">Bachelors Degreen in LPU</div>
                                            <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* <!-- End of Experience and education grid --> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfile;