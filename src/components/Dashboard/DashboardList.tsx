
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
    }
]