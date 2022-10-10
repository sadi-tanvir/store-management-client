import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarIcon } from '../shared/icons/icons';
import { LinkType, NavListType } from '../types/navbar.types';
import { NavList } from './components/NavList';
import { ActiveMobileNavProps } from './components/StyleNav';

const SmallDeviceNav = () => {

    return (
        <>
            <div className="navbar-start md:hidden">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost btn-circle dark:bg-darkAccent">
                        <BarIcon iconClass="h-5 w-5 text-secondary dark:text-darkNeutral" />
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 dark:bg-darkSecondary rounded-box w-52">
                        {
                            NavList.map((link: NavListType) => {
                                return (
                                    <li key={link.key}>
                                        <NavLink to={link.path} style={ActiveMobileNavProps}>
                                            {link.title}
                                        </NavLink>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className="navbar-center md:hidden">
                <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
            </div>
        </>
    );
};

export default SmallDeviceNav;