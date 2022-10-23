import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { ActiveNavProps } from '../navbar/components/StyleNav';
import { DashBoardNav, DashListType } from './DashboardList';

const Dashboard = () => {
    return (
        <>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center">
                    {/* <!-- Page content here --> */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-60 bg-darkNeutral text-base-content">
                        {/* <!-- Sidebar content here --> */}
                        {DashBoardNav.map((link: DashListType) => {
                            return (
                                <li key={link.key}>
                                    <NavLink to={link.path} style={ActiveNavProps}>
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