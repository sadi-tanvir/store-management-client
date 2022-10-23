import React from 'react';
import { NavLink } from 'react-router-dom';
import { NotificationIcon } from '../../shared/icons/icons';
import { ActiveNavProps, activeStyle, activeStyleMobile } from './StyleNav';


const StockMenu = ({ style }: any) => {
    return (
        <>
            <div className={`dropdown dropdown-end ${style.display} ${style.activeStyle}`}>
                <label tabIndex={0} className="">
                    {style.display.split(" ")[0] == 'hidden' ? <NavLink to='#' style={activeStyle}>
                        Stock
                    </NavLink> :
                        <NavLink to='#' style={{ color: '#475569', fontWeight: 'bold' }}>
                            Stock
                        </NavLink>
                    }
                </label>
                <ul tabIndex={0} className={`border flex flex-row dark:bg-darkSecondary menu menu-compact dropdown-content mt-4 p-2 shadow bg-base-100 rounded-b-2xl rounded-t-lg w-72 ${style.position}`}>
                    <div>
                        <li className="dark:bg-darkSecondary bg-neutral mt-1  ">
                            <a className="text-secondary font-bold">
                                Broiler Feed
                            </a>
                        </li>
                        <li className="bg-neutral mt-1 dark:bg-darkSecondary ">
                            <a className="text-secondary font-bold">
                                layer Feed
                            </a>
                        </li>
                        <li className="bg-neutral mt-1 dark:bg-darkSecondary ">
                            <a className="text-secondary font-bold">
                                Sonali Feed
                            </a>
                        </li>
                    </div>
                    <div>
                        <li className="dark:bg-darkSecondary bg-neutral mt-1  ">
                            <a className="text-secondary font-bold">
                                Fish Feed
                            </a>
                        </li>
                        <li className="bg-neutral mt-1 dark:bg-darkSecondary ">
                            <a className="text-secondary font-bold">
                                Animal Feed
                            </a>
                        </li>
                        <li className="bg-neutral mt-1 dark:bg-darkSecondary ">
                            <a className="text-secondary font-bold">
                                Birds Feed
                            </a>
                        </li>
                    </div>
                    <div>
                        <li className="dark:bg-darkSecondary bg-neutral mt-1  ">
                            <a className="text-secondary font-bold">
                                Medicines
                            </a>
                        </li>
                        <li className="bg-neutral mt-1 dark:bg-darkSecondary ">
                            <a className="text-secondary font-bold">
                                Vaccines
                            </a>
                        </li>
                        <li className="bg-neutral mt-1 dark:bg-darkSecondary ">
                            <a className="text-secondary font-bold">
                                Others Products
                            </a>
                        </li>
                    </div>
                </ul>
            </div>
        </>
    );
};

export default StockMenu;