import SmallDeviceNav from './SmallDeviceNav';
import ProfileNav from './components/ProfileNav';
import NotificationNav from './components/NotificationNav';
import { NavLink } from "react-router-dom"
import { ActiveStyleType, LinkType, NavListType } from '../types/navbar.types';
import { ActiveNavProps } from './components/StyleNav';
import { NavList } from "./components/NavList";

const Navbar = () => {



    return (
        <>
            <div className="navbar bg-base-100 dark:bg-darkSecondary">
                <div className="navbar-start hidden md:block">
                    <a className="btn btn-ghost normal-case text-xl">
                        <img src="/logo.png" alt="site-logo" />
                    </a>
                </div>
                <SmallDeviceNav />

                <div className="navbar-end">
                    <div className="hidden md:block">
                        {
                            NavList.map((link: NavListType) => {
                                return (
                                    <NavLink key={link.key} to={link.path} style={ActiveNavProps}>
                                        {link.title}
                                    </NavLink>
                                )
                            })
                        }
                    </div>
                    <NotificationNav />
                    <ProfileNav />
                </div>
            </div>
        </>
    );
};

export default Navbar;