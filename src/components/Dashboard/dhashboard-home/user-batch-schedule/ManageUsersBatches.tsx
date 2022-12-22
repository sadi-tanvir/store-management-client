import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { GET_ALL_ACTIVE_BATCHES } from '../../../../gql/queries/batchQueries';
import UserBatchCard from '../../manage-batches/UserBatchCard';
import { CLOSE_BATCH_MUTATION } from '../../../../gql/mutations/batchMutation';
import Swal from 'sweetalert2';

const ManageUsersActiveBatches = () => {
    const activeBatchResponse = useQuery(GET_ALL_ACTIVE_BATCHES);

    // gql
    const [closeBatchMutation, { data, loading, error }] = useMutation(CLOSE_BATCH_MUTATION, {
        refetchQueries: [GET_ALL_ACTIVE_BATCHES],
    });

    const closeBatchById = (batchId: string) => {
        Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#14b8a6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Close it!' })
            .then((result) => {
                if (result.isConfirmed) {
                    closeBatchMutation({
                        variables: {
                            batchId: batchId
                        }
                    })
                }
            })
    }

    return (
        <>
            <h1 className='ml-3 text-2xl text-secondary font-bold uppercase mb-2'>Manage Running Batches</h1>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 px-3">
                {
                    activeBatchResponse?.data?.getAllOpenBatches?.map((batch: any) => <UserBatchCard batch={batch} closeBatchById={closeBatchById} />)
                }
            </div>
        </>
    );
};

export default ManageUsersActiveBatches;