import { useQuery } from '@apollo/client';
import ProductButton from '../../../components/Dashboard/manage-product-creation/ProuductButton';
import { GET_PRODUCTS } from '../../../gql/queries/productQueries';
import CreateProductModal from "../../../components/Dashboard/manage-product-creation/create-product/CreateProductModal";
import CreateStockModal from "../../../components/Dashboard/manage-product-creation/create-stock/CreateStockModal";
import { BrandIcon, CategoryIcon, ProductIcon, StockIcon, SupplierIcon } from "../../../components/shared/icons/icons";
import { GET_CATEGORIES } from '../../../gql/queries/categoryQueries';
import { GET_BRANDS_2 } from '../../../gql/queries/brandQueries';
import { GET_SUPPLIERS_WITH_DETAILS } from '../../../gql/queries/supplierQueries';
import CreateBrandModal from '../../../components/Dashboard/manage-product-creation/create-brand/CreateBrandModal';
import CreateCategoryModal from '../../../components/Dashboard/manage-product-creation/create-category/CreateCategoryModal';
import CreateSupplierModal from '../../../components/Dashboard/manage-product-creation/create-supplier/CreateSupplierModal';
import Breadcrumbs from '../../../components/shared/components/Breadcrumbs';
import ReactHelmet from '../../../components/shared/components/ReactHelmet';

const ProductCreation = () => {

    // gql queries
    const productResponse = useQuery(GET_PRODUCTS);
    const categoryResponse = useQuery(GET_CATEGORIES);
    const brandResponse = useQuery(GET_BRANDS_2);
    const supplierResponse = useQuery(GET_SUPPLIERS_WITH_DETAILS);



    const ProductCreateList = [
        {
            modalId: "create-category-modal",
            label: 'Create Category',
            icon: <CategoryIcon iconClass="h-8 w-8 text-primary" />,
            modalComponent: <CreateCategoryModal
                header="Create Category"
                modalId="create-category-modal"
            />
        },
        {
            modalId: "create-supplier-modal",
            label: 'Create Supplier',
            icon: <SupplierIcon iconClass="h-8 w-8 text-primary" />,
            modalComponent: <CreateSupplierModal
                header="Create Supplier"
                modalId="create-supplier-modal"
                brands={brandResponse?.data?.brands}
            />
        },
        {
            modalId: "create-brand-modal",
            label: 'Create Brand',
            icon: <BrandIcon iconClass="h-8 w-8 text-primary" />,
            modalComponent: <CreateBrandModal
                header="Create Brand"
                modalId="create-brand-modal"
                products={productResponse?.data?.products.map((product: any) => {
                    return {
                        name: product.name,
                        _id: product._id
                    }
                })}
                suppliers={supplierResponse?.data?.suppliers?.map((supplier: any) => {
                    return {
                        id: supplier._id,
                        name: supplier.name,
                        email: supplier.email,
                        phone: supplier.contactNumber,
                    }
                })}
            />
        },
        {
            modalId: "create-product-modal",
            label: 'Create Product',
            icon: <ProductIcon iconClass="h-8 w-8 text-primary" />,
            modalComponent: <CreateProductModal
                header="Create Product"
                modalId="create-product-modal"
                categories={categoryResponse?.data?.categories}
                brands={brandResponse?.data?.brands}
            />
        },
        {
            modalId: "create-stock-modal",
            label: 'Create Stock',
            icon: <StockIcon iconClass="h-8 w-8 text-primary" />,
            modalComponent: <CreateStockModal
                header="Create Stock"
                modalId="create-stock-modal"
                products={productResponse?.data?.products}
                suppliers={supplierResponse?.data?.suppliers}
            />
        },
    ];

    return (
        <>
            <div className="px-5">
                <Breadcrumbs firstPath="/dashboard" firstName="Dashboard" current="Product Creation" />
                <ReactHelmet title={'Product Creation'} />
            </div>
            <div className="w-full min-h-screen dark:bg-darkPrimary">
                <div className="w-full mx-auto grid sm:grid-cols-3 md:grid-cols-4 gap-4 px-3 sm:px-5 mt-20 lg:mt-10">
                    {
                        ProductCreateList.map((elem, index) =>
                            <>
                                <ProductButton key={index + 1} modalId={elem.modalId} label={elem.label}>
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