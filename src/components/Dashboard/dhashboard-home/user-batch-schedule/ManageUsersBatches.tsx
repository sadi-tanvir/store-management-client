import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_ALL_ACTIVE_BATCHES } from '../../../../gql/queries/batchQueries';
import UserBatchCard from '../../manage-batches/UserBatchCard';

const ManageUsersActiveBatches = () => {
    const activeBatchResponse = useQuery(GET_ALL_ACTIVE_BATCHES);

    console.log('activeBatchResponse', activeBatchResponse?.data?.getAllOpenBatches);


    return (
        <>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 px-3">
                {
                    activeBatchResponse?.data?.getAllOpenBatches?.map((batch: any) => <UserBatchCard batch={batch} />)
                }
            </div>
        </>
    );
};

export default ManageUsersActiveBatches;