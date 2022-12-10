import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_USERS } from '../../../gql/queries/userAuthQueries';
import { DashboardUserType } from '../../../types/dashboard/mangeUsers.types';
import UserCard from '../../../components/Dashboard/manage-users/UserCard';
import { useAppSelector } from '../../../redux/hooks/hooks';
import Breadcrumbs from '../../../components/shared/components/Breadcrumbs';
import ReactHelmet from '../../../components/shared/components/ReactHelmet';

const Users = () => {
    // redux
    const { ownerInfo } = useAppSelector(state => state.authReducer);

    // gql
    const { loading, error, data } = useQuery(GET_USERS);


    return (
        <>
            <div className="px-5">
                <Breadcrumbs firstPath="/dashboard" firstName="Dashboard" current="Manage Users" />
                <ReactHelmet title={'Manage Users - Store Management'} />
            </div>
            <div className="w-full min-h-screen dark:bg-darkPrimary">
                <div className="w-full mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-4 px-3 sm:px-5 mt-16 lg:mt-10">
                    {
                        data?.users
                            .filter((allUsers: DashboardUserType) => allUsers.email !== ownerInfo.email)
                            .map((user: DashboardUserType) => <UserCard key={user._id} user={user} />)
                    }
                </div>
            </div>
        </>
    );
};

export default Users;