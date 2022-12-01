import React from 'react';
import { Outlet } from 'react-router-dom';

const Stock = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default Stock;