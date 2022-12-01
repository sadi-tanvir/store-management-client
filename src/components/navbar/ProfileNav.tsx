import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { ApiBaseUrl } from '../utilities/ApiBaseUrl';
import DarkMode from './DarkMode';
import { ActiveMobileNavProps } from './StyleNav';

const ProfileNav = () => {
    // redux
    const dispatch = useAppDispatch()
    const { ownerInfo } = useAppSelector(state => state.authReducer);

    // handle logout
    const handleLogout = () => {
        dispatch({ type: 'logOutUser' })
        localStorage.clear()
    }

    return (
        <>
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img src={`${ApiBaseUrl}/profile-pic/${ownerInfo?.image}`} />
                    </div>
                </label>
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-4 p-2 shadow bg-base-100 dark:bg-darkSecondary rounded-b-2xl rounded-t-lg w-52">
                    <li>
                        <a className="flex justify-between dark:text-darkNeutral">
                            Dark Mode
                            <DarkMode />
                        </a>
                    </li>
                    <li>
                        <NavLink to="/owner-profile" style={ActiveMobileNavProps}>
                            My Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/owner-batches" style={ActiveMobileNavProps}>
                            My Batches
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/owner-orders" style={ActiveMobileNavProps}>
                            My Orders
                        </NavLink>
                    </li>
                    <li onClick={handleLogout} className="dark:text-darkNeutral">
                        <span className="text-red-500 font-bold">Logout</span>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default ProfileNav;