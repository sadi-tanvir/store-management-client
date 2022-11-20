import React from 'react';
import UserBatchCard from './UserBatchCard';

const ManageUsersBatches = () => {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-2">

                <UserBatchCard />
                <UserBatchCard />
                <UserBatchCard />
            </div>
        </>
    );
};

export default ManageUsersBatches;