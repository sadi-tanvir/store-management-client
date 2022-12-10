import HeaderSlider from '../../components/home/header-slider/HeaderSlider';
import ReactHelmet from '../../components/shared/components/ReactHelmet';
import Footer from '../Footer/Footer';
import classes from "../../components/styles/global-style/global.module.css"
import BusinessOverview from '../../components/home/business-overview/BusinessOverview';
import ProductOverview from '../../components/home/product-overview/ProductOverview';



const Home = () => {

    return (
        <>
            <ReactHelmet title={'Home - Store Management'} />
            <div className="w-full min-h-screen mx-auto text-center dark:bg-darkPrimary">
                {/* header slider */}
                <HeaderSlider />

                {/* home content */}
                <div className={`${classes.global_background}`}>
                    <div className={`relative bg-slate-200 opacity-[0.80] pt-6 pb-[870px] md:pb-[450px] lg:pb-[480px]`}>

                        {/* product overview section */}
                        <ProductOverview />

                        <BusinessOverview />

                        {/* footer section */}
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;