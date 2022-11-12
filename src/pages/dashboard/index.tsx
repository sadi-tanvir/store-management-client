import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { DashBoardNav, DashListType } from '../../components/Dashboard/DashboardList';
import { ActiveNavProps, SidebarActiveProps } from '../../components/navbar/StyleNav';
import { BrandIcon, DrawerOpenIcon } from '../../components/shared/icons/icons';

const Dashboard = () => {
    return (
        <>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center">
                    {/* <!-- Page content here --> */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden absolute left-2 top-[80px]">
                        <DrawerOpenIcon />
                    </label>

                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-60 sm:w-64 bg-darkNeutral text-base-content">
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
        </>
    );
};

export default Dashboard;