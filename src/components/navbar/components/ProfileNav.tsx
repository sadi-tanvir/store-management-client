import React from 'react';
import { DarkModePropsType } from '../../types/global.types';
import DarkMode from './DarkMode';

const ProfileNav = () => {
    return (
        <>
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img src="https://placeimg.com/80/80/people" />
                    </div>
                </label>
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 dark:bg-darkSecondary rounded-box w-52">
                    <li>
                        <a className="flex justify-between dark:text-darkNeutral">
                            Dark Mode
                            <DarkMode />
                        </a>
                    </li>
                    <li>
                        <a className="justify-between dark:text-darkNeutral">
                            Profile
                            <span className="badge">New</span>
                        </a>
                    </li>
                    <li className="dark:text-darkNeutral"><a>Settings</a></li>
                    <li className="dark:text-darkNeutral"><a>Logout</a></li>
                </ul>
            </div>
        </>
    );
};

export default ProfileNav;