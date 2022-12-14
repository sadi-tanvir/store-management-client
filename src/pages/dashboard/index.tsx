import { useEffect } from "react"
import { NavLink, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { DashBoardNav, DashListType } from '../../components/Dashboard/DashboardList';
import { ActiveNavProps, SidebarActiveProps } from '../../components/navbar/StyleNav';
import { BrandIcon, DrawerOpenIcon } from '../../components/shared/icons/icons';
import classes from "../../components/styles/global-style/global.module.css"
import { useAppSelector } from "../../redux/hooks/hooks";

const Dashboard = () => {
    const { isAuthenticate } = useAppSelector(state => state.authReducer);

    // router
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticate) {
            navigate('/login');
        }
    }, [isAuthenticate, navigate])

    return (
        <>
            <div className={`w-full min-h-screen ${classes.global_background}`}>
                <div className="drawer drawer-mobile bg-slate-200 opacity-[0.70] pt-24">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col items-start pb-[100px] lg:pb-[20px]">
                        {/* <!-- Page content here --> */}
                        <label htmlFor="my-drawer-2" className="btn btn-sm btn-[secondary] bg-slate-700 drawer-button lg:hidden absolute right-1 opacity-70 top-[70px] z-40">
                            <DrawerOpenIcon />
                        </label>

                        {/* route outlet */}
                        <Outlet />
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                        <ul className="menu p-4 overflow-y-auto w-60 sm:w-64 bg-slate-50 text-base-content">
                            {/* <!-- Sidebar content here --> */}
                            {DashBoardNav.map((link: DashListType) => {
                                return (
                                    <li className="mt-2" key={link.key}>
                                        <NavLink to={link.path} style={SidebarActiveProps}>
                                            {link.icon}
                                            {link.title}
                                        </NavLink>
                                    </li>
                                )
                            })}
                        </ul>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;