
export type DashListType = {
    key: number;
    title: string;
    path: string;
}

export const DashBoardNav: DashListType[] = [
    {
        key: 1,
        title: 'Manage Users',
        path: '/dashboard'
    },
    {
        key: 2,
        title: 'manage product creation',
        path: '/dashboard/manage-product-creation'
    },
    {
        key: 3,
        title: 'manage brands',
        path: '/dashboard/manage-brands'
    },
    {
        key: 4,
        title: 'manage products',
        path: '/dashboard/manage-products'
    },
    {
        key: 5,
        title: 'manage categories',
        path: '/dashboard/manage-categories'
    },
    {
        key: 6,
        title: 'manage suppliers',
        path: '/dashboard/manage-suppliers'
    }
]