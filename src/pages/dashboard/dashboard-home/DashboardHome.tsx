import React from 'react';
import ManageUsersActiveBatches from '../../../components/Dashboard/dhashboard-home/user-batch-schedule/ManageUsersBatches';
import Breadcrumbs from '../../../components/shared/components/Breadcrumbs';
import ReactHelmet from '../../../components/shared/components/ReactHelmet';
import InfoCard from '../../../components/Dashboard/dhashboard-home/manage-information/InfoCard';

const DashboardHome = () => {
    return (
        <>
            <div className="px-3">
                <Breadcrumbs firstPath="/dashboard" firstName="Dashboard" current="dashboard" />
                <ReactHelmet title={'Dashboard - Store Management'} />
            </div>

            <div className="mb-10 ml-2">
                <h1 className="text-2xl text-secondary font-bold uppercase mb-2">Manage User Information</h1>
                <div className="w-full grid grid-cols-1 md:grid-cols-3 content-center gap-3">
                    <InfoCard
                        heading="Total Registered Users"
                        info="6 users"
                    />
                    <InfoCard
                        heading="Total Running Batches"
                        info="5 batches"
                    />
                    <InfoCard
                        heading="Total Running Batches"
                        info="5 batches"
                    />
                </div>
            </div>

            <ManageUsersActiveBatches />
        </>
    );
};

export default DashboardHome;