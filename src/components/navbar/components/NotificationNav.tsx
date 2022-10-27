import React from 'react';
import { NotificationIcon } from '../../shared/icons/icons';

const NotificationNav = () => {
    return (
        <>
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <button className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <NotificationIcon
                                iconClass="h-5 w-5 dark:text-darkNeutral"
                            />
                            <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div>
                    </button>
                </label>
                <ul tabIndex={0} className=" dark:bg-darkSecondary menu menu-compact dropdown-content mt-4 p-2 shadow bg-base-100 rounded-b-2xl rounded-t-lg w-72 -mr-10">
                    <li className="dark:bg-darkSecondary bg-neutral mt-1  ">
                        <a className="text-secondary font-bold">
                            purchase order
                        </a>
                    </li>
                    <li className="bg-neutral mt-1 dark:bg-darkSecondary ">
                        <a className="text-secondary font-bold">
                            purchase order
                        </a>
                    </li>
                    <li className="bg-neutral mt-1 dark:bg-darkSecondary ">
                        <a className="text-secondary font-bold">
                            some one is created a account
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default NotificationNav;