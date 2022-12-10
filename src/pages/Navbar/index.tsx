import { Link } from 'react-router-dom';
import LargeDeviceNav from './large-device-nav/LargeDeviceNav';
import SmallDeviceNav from './small-device-nav/SmallDeviceNav';


const Navbar = () => {

    return (
        <>
            <div className="absolute top-0 z-40 opacity-70 navbar navbar-global bg-base-100 dark:bg-darkSecondary">
                <div className="navbar-start hidden md:block">
                    <Link to="/" className="btn btn-ghost normal-case text-xl">
                        <img src="/logo.png" alt="site-logo" />
                    </Link>
                </div>
                <SmallDeviceNav />
                <LargeDeviceNav />
            </div>
        </>
    );
};

export default Navbar;