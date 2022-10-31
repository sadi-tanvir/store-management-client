import LargeDeviceNav from './large-device-nav/LargeDeviceNav';
import SmallDeviceNav from './small-device-nav/SmallDeviceNav';


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
                <LargeDeviceNav />

            </div>
        </>
    );
};

export default Navbar;