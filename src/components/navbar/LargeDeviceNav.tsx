import ProfileNav from './components/ProfileNav';
import NotificationNav from './components/NotificationNav';
import { NavLink } from "react-router-dom"
import { NavListType } from '../../types/navbar.types';
import { ActiveNavProps } from './components/StyleNav';
import { AuthorizedNavList, UnauthorizedNavList } from "./components/NavList";
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { CartIcon } from '../shared/icons/icons';


const LargeDeviceNav = () => {
    // redux
    const { isAuthenticate } = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch()
    return (
        <>
            <div className="navbar-end">

                <div className="hidden md:block">
                    {isAuthenticate ?
                        <>
                            {AuthorizedNavList.map((link: NavListType) => {
                                return (
                                    <NavLink key={link.key} to={link.path} style={ActiveNavProps}>
                                        {link.title}
                                    </NavLink>
                                )
                            })}
                        </>
                        :
                        <>
                            {UnauthorizedNavList.map((link: NavListType) => {
                                return (
                                    <NavLink key={link.key} to={link.path} style={ActiveNavProps}>
                                        {link.title}
                                    </NavLink>
                                )
                            })}
                        </>
                    }
                </div>


                {isAuthenticate && <>
                    <div onClick={() => dispatch({ type: 'setCart' })} className="indicator cursor-pointer">
                        <span className="indicator-item badge badge-primary">8</span>
                        <CartIcon
                            iconClass="hover:scale-125 active:scale-100 transition-all cursor-pointer w-6 h-6 text-secondary"
                        />
                    </div>

                    <NotificationNav />
                    <ProfileNav />
                </>}
            </div>
        </>
    );
};

export default LargeDeviceNav;