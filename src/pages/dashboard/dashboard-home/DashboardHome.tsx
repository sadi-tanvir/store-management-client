import React from 'react';
import ManageUsersActiveBatches from '../../../components/Dashboard/dhashboard-home/user-batch-schedule/ManageUsersBatches';
import Breadcrumbs from '../../../components/shared/components/Breadcrumbs';
import ReactHelmet from '../../../components/shared/components/ReactHelmet';

const DashboardHome = () => {
    return (
        <>
            <div className="px-3">
                <Breadcrumbs firstPath="/dashboard" firstName="Dashboard" current="dashboard" />
                <ReactHelmet title={'Dashboard'} />
            </div>
            <ManageUsersActiveBatches />
        </>
    );
};

export default DashboardHome;