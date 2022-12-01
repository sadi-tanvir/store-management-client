import { NavLink, useNavigate } from 'react-router-dom';
import { ActiveNavProps, ActiveStockNavProps, activeStyle } from './StyleNav';


const StockMenu = ({ style }: { style: { display: string; position: string; activeStyle: string; } }) => {

    // router
    const navigate = useNavigate();

    return (
        <>
            <div className={`dropdown dropdown-end ${style.display}`}>
                <NavLink to='/stocks' style={ActiveNavProps}>
                    <label onClick={() => navigate('/stocks')} tabIndex={0} className="cursor-pointer">
                        Stocks
                    </label>
                </NavLink>
                <ul tabIndex={0} className={`border grid grid-cols-3 dark:bg-darkSecondary menu menu-compact dropdown-content mt-4 p-2 shadow bg-base-100 rounded-b-2xl rounded-t-lg w-72 ${style.position}`}>
                    <div className="grid grid-rows-1 content-center items-center content-center items-center">
                        <li className="dark:bg-darkSecondary bg-neutral mt-1  ">
                            <NavLink to='/stocks/medicine-stock' style={ActiveStockNavProps}>
                                <a className="text-secondary font-bold">
                                    Medicine
                                </a>
                            </NavLink>
                        </li>
                    </div>
                    <div className="grid grid-rows-1 content-center items-center">
                        <li className="dark:bg-darkSecondary bg-neutral mt-1  ">
                            <NavLink to='/stocks/broiler-feed-stock' style={ActiveStockNavProps}>
                                <a className="text-secondary font-bold">
                                    Broiler Feed
                                </a>
                            </NavLink>
                        </li>
                    </div>
                    <div className="grid grid-rows-1 content-center items-center">
                        <li className="dark:bg-darkSecondary bg-neutral mt-1  ">
                            <NavLink to='/stocks/layer-feed-stock' style={ActiveStockNavProps}>
                                <a className="text-secondary font-bold">
                                    Layer Feed
                                </a>
                            </NavLink>
                        </li>
                    </div>
                </ul>
            </div>
        </>
    );
};

export default StockMenu;