import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarIcon } from '../shared/icons/icons';
import { NavListType } from '../../types/navbar.types';
import { AuthorizedNavList, UnauthorizedNavList } from './components/NavList';
import { ActiveMobileNavProps, activeStyle } from './components/StyleNav';
import { useAppSelector } from '../../redux/hooks/hooks';
import { Link } from 'react-router-dom';
import StockMenu from './components/StockMenu';

const SmallDeviceNav = () => {
    // redux
    const { isAuthenticate } = useAppSelector(state => state.authReducer);

    return (
        <>
            <div className="navbar-start md:hidden">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost btn-circle dark:bg-darkAccent">
                        <BarIcon iconClass="h-5 w-5 text-secondary dark:text-darkNeutral" />
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 dark:bg-darkSecondary rounded-box w-52">
                        {isAuthenticate ?
                            <>
                                {AuthorizedNavList.map((link: NavListType) => {
                                    return (
                                        <li key={link.key}>
                                            <NavLink to={link.path} style={ActiveMobileNavProps}>
                                                {link.title}
                                            </NavLink>
                                        </li>
                                    )
                                })}
                            </>
                            :
                            <>
                                {UnauthorizedNavList.map((link: NavListType) => {
                                    return (
                                        <li key={link.key}>
                                            <NavLink to={link.path} style={ActiveMobileNavProps}>
                                                {link.title}
                                            </NavLink>
                                        </li>
                                    )
                                })}
                            </>
                        }
                        <li>
                            <StockMenu
                                style={{
                                    display: 'md:hidden',
                                    activeStyle: 'bg-darkNeutral',
                                    position: '-mr-20 mt-[256px]'
                                }}
                            />
                        </li>
                    </ul>
                </div>

            </div>
            <div className="navbar-center md:hidden">
                <Link to="/" className="btn btn-ghost normal-case text-xl">
                    <img width={90} src="/logo.png" alt="site-logo" />
                </Link>
            </div>
        </>
    );
};

export default SmallDeviceNav;