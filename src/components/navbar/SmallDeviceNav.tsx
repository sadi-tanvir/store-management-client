import React from 'react';
import { NavLink } from 'react-router-dom';
import { LinkType, NavListType } from '../types/navbar.types';
import { NavList } from './components/NavList';
import { activeStyle, activeStyleMobile, nonActiveStyle, nonActiveStyleMobile } from './components/StyleObject';

const SmallDeviceNav = () => {
    return (
        <>
            <div className="navbar-start md:hidden">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {
                            NavList.map((link: NavListType) => {
                                return (
                                    <li>
                                        <NavLink key={link.key} to={link.path} style={({ isActive }: LinkType) => isActive ? activeStyleMobile : nonActiveStyleMobile}>
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