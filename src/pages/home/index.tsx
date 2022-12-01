import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks'
import Cart from '../../components/cart/Cart';
import HeaderSlider from '../../components/home/header-slider/HeaderSlider';
import SmallDeviceNav from '../Navbar/small-device-nav/SmallDeviceNav';
import LargeDeviceNav from '../Navbar/large-device-nav/LargeDeviceNav';




const Home = () => {

    const { value } = useAppSelector(state => state.counterReducer);
    const dispatch = useAppDispatch()

    return (
        <>
            <div className="absolute z-50 opacity-70 navbar bg-base-100 dark:bg-darkSecondary">
                <div className="navbar-start hidden md:block">
                    <a className="btn btn-ghost normal-case text-xl">
                        <img src="/logo.png" alt="site-logo" />
                    </a>
                </div>
                <SmallDeviceNav />
                <LargeDeviceNav />

            </div>

            <div className="w-full mx-auto text-center dark:bg-darkPrimary">
                <HeaderSlider />
            </div>

            <style>
                {`
                    .navbar-global {
                        display: none !important;
                    }
                `}
            </style>
        </>
    );
};

export default Home;