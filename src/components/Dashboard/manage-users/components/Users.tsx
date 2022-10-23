import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_USERS } from '../../../../gql/queries/userAuthQueries';
import { DashboardUserType } from '../../../../types/dashboard/users.types';
import UserCard from './UserCard';

const Users = () => {

    const { loading, error, data } = useQuery(GET_USERS);

    console.log(`i am from dashboard at users component`, data?.users);


    return (
        <>
            <div className="w-full min-h-screen dark:bg-darkPrimary">
                <div className="w-full mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-4 px-3 sm:px-5 mt-10">
                    {
                        data?.users?.map((user: DashboardUserType) => <UserCard key={user._id} user={user} />)
                    }
                </div>
            </div>
        </>
    );
};

export default Users;