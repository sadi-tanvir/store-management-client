import React from 'react';
import CreateStockModal from '../../../components/Dashboard/manage-product-creation/CreateStockModal';
import ProductButton from '../../../components/Dashboard/manage-product-creation/ProuductButton';
import { BrandIcon, CategoryIcon, ProductIcon, StockIcon, SupplierIcon } from '../../../components/shared/icons/icons';

const ProductCreation = () => {

    const productCreateList = [
        {
            modalId: "create-stock-modal",
            label: 'Create Stock',
            icon: <StockIcon />
        },
        {
            modalId: "create-product-modal",
            label: 'Create Product',
            icon: <ProductIcon />
        },
        {
            modalId: "create-brand-modal",
            label: 'Create Brand',
            icon: <BrandIcon />
        },
        {
            modalId: "create-category-modal",
            label: 'Create Category',
            icon: <CategoryIcon />
        },
        {
            modalId: "create-supplier-modal",
            label: 'Create Supplier',
            icon: <SupplierIcon />
        },
    ]

    return (
        <>
            <div className="w-full min-h-screen dark:bg-darkPrimary">
                <div className="w-full mx-auto grid sm:grid-cols-3 md:grid-cols-4 gap-4 px-3 sm:px-5 mt-20 lg:mt-10">
                    {
                        productCreateList.map((elem, index) =>
                            <ProductButton key={index} modalId={elem.modalId} label={elem.label}>
                                {elem.icon}
                            </ProductButton>
                        )
                    }
                </div>
            </div>
            {
                productCreateList.map((elem, index) =>
                    <CreateStockModal
                        key={index}
                        header={elem.label}
                        modalId={elem.modalId}
                    />
                )
            }
        </>
    );
};

export default ProductCreation;