import { NavLink } from "react-router-dom"
import { NavListType } from '../../../types/navbar.types';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hooks';
import { CartIcon } from '../../../components/shared/icons/icons';
import ProfileNav from '../../../components/navbar/ProfileNav';
import { AuthorizedNavList, UnauthorizedNavList } from "../../../components/navbar/NavList";
import { ActiveNavProps } from "../../../components/navbar/StyleNav";
import StockMenu from "../../../components/navbar/StockMenu";
import NotificationNav from "../../../components/navbar/NotificationNav";


const LargeDeviceNav = () => {
    // redux
    const { isAuthenticate } = useAppSelector(state => state.authReducer);
    const { cart } = useAppSelector(state => state.cartReducer);
    const dispatch = useAppDispatch()
    const sss: any = Object.values(cart).filter((item: any) => item.stockId === '636028334a45db09751c72b7')
    console.log(sss[0]?.qty);


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

                <StockMenu
                    style={{
                        display: 'hidden md:block',
                        position: '-mr-10',
                        activeStyle: ''
                    }}
                />

                <div onClick={() => dispatch({ type: 'setCart' })} className="indicator cursor-pointer">
                    <span className="indicator-item badge badge-primary">
                        {
                            Object.values(cart)
                                .map((item: any) => item.qty)
                                .reduce((a: number, b: number) => a + b, 0)
                        }
                    </span>
                    <CartIcon
                        iconClass="hover:scale-125 active:scale-100 transition-all cursor-pointer w-6 h-6 text-secondary"
                    />
                </div>
                {isAuthenticate && <>

                    <NotificationNav />
                    <ProfileNav />
                </>}
            </div>
        </>
    );
};

export default LargeDeviceNav;