import { useQuery } from '@apollo/client';
import ProductButton from '../../../components/Dashboard/manage-product-creation/ProuductButton';
import { GET_PRODUCTS } from '../../../gql/queries/productQueries';
// import { ProductCreateList } from './productCreateList';
import CreateProductModal from "../../../components/Dashboard/manage-product-creation/create-product/CreateProductModal";
import CreateStockModal from "../../../components/Dashboard/manage-product-creation/create-stock/CreateStockModal";
import { BrandIcon, CategoryIcon, ProductIcon, StockIcon, SupplierIcon } from "../../../components/shared/icons/icons";
import { GET_CATEGORIES } from '../../../gql/queries/categoryQueries';
import { GET_BRANDS } from '../../../gql/queries/brandQueries';
import { GET_SUPPLIERS } from '../../../gql/queries/supplierQueries';

const ProductCreation = () => {

    // gql queries
    const productResponse = useQuery(GET_PRODUCTS);
    const categoryResponse = useQuery(GET_CATEGORIES);
    const brandResponse = useQuery(GET_BRANDS);
    const supplierResponse = useQuery(GET_SUPPLIERS);


    const ProductCreateList = [
        {
            modalId: "create-stock-modal",
            label: 'Create Stock',
            icon: <StockIcon />,
            modalComponent: <CreateStockModal
                header="Create Stock"
                modalId="create-stock-modal"
                products={productResponse?.data?.products}
                categories={categoryResponse?.data?.categories}
                brands={brandResponse?.data?.brands}
                suppliers={supplierResponse?.data?.suppliers}
            />
        },
        {
            modalId: "create-product-modal",
            label: 'Create Product',
            icon: <ProductIcon />,
            modalComponent: <CreateProductModal
                header="Create Product"
                modalId="create-product-modal"
            />
        },
        {
            modalId: "create-brand-modal",
            label: 'Create Brand',
            icon: <BrandIcon />,
            modalComponent: <CreateStockModal
                header="Create Stock"
                modalId="create-stock-modal"
                products={productResponse?.data?.products}
                categories={categoryResponse?.data?.categories}
                brands={brandResponse?.data?.brands}
                suppliers={supplierResponse?.data?.suppliers}
            />
        },
        {
            modalId: "create-category-modal",
            label: 'Create Category',
            icon: <CategoryIcon />,
            modalComponent: <CreateStockModal
                header="Create Stock"
                modalId="create-stock-modal"
                products={productResponse?.data?.products}
                categories={categoryResponse?.data?.categories}
                brands={brandResponse?.data?.brands}
                suppliers={supplierResponse?.data?.suppliers}
            />
        },
        {
            modalId: "create-supplier-modal",
            label: 'Create Supplier',
            icon: <SupplierIcon />,
            modalComponent: <CreateStockModal
                header="Create Stock"
                modalId="create-stock-modal"
                products={productResponse?.data?.products}
                categories={categoryResponse?.data?.categories}
                brands={brandResponse?.data?.brands}
                suppliers={supplierResponse?.data?.suppliers}
            />
        },
    ];

    return (
        <>
            <div className="w-full min-h-screen dark:bg-darkPrimary">
                <div className="w-full mx-auto grid sm:grid-cols-3 md:grid-cols-4 gap-4 px-3 sm:px-5 mt-20 lg:mt-10">
                    {
                        ProductCreateList.map((elem, index) =>
                            <>
                                <ProductButton key={index} modalId={elem.modalId} label={elem.label}>
                                    {elem.icon}
                                </ProductButton>
                                {elem.modalComponent}
                            </>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default ProductCreation;