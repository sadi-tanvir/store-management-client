import { BrandIcon, CategoryIcon, ProductIcon, StockIcon, SupplierIcon, UsersIcon } from "../shared/icons/icons";

export type DashListType = {
    key: number;
    title: string;
    path: string;
    icon: JSX.Element;
}

export const DashBoardNav: DashListType[] = [
    {
        key: 1,
        title: 'Manage Users',
        path: '/dashboard/manage-users',
        icon: <UsersIcon iconClass="h-5 w-5" />
    },
    {
        key: 2,
        title: 'Manage Orders',
        path: '/dashboard/manage-orders',
        icon: <StockIcon iconClass="h-5 w-5" />
    },
    {
        key: 3,
        title: 'Manage Stocks',
        path: '/dashboard/manage-stocks',
        icon: <StockIcon iconClass="h-5 w-5" />
    },
    {
        key: 4,
        title: 'Manage Products',
        path: '/dashboard/manage-products',
        icon: <ProductIcon iconClass="h-5 w-5" />
    },
    {
        key: 5,
        title: 'Manage Brands',
        path: '/dashboard/manage-brands',
        icon: <BrandIcon iconClass="h-5 w-5" />
    },
    {
        key: 6,
        title: 'Manage Categories',
        path: '/dashboard/manage-categories',
        icon: <CategoryIcon iconClass="h-5 w-5" />
    },
    {
        key: 7,
        title: 'Manage Suppliers',
        path: '/dashboard/manage-suppliers',
        icon: <SupplierIcon iconClass="h-5 w-5" />
    },
    {
        key: 8,
        title: 'Product Creation',
        path: '/dashboard/manage-product-creation',
        icon: <ProductIcon iconClass="h-5 w-5" />
    }
]