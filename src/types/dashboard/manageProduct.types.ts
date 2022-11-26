export type ManageProductType = {
    _id: string;
    name: string;
    description: string;
    unit: string;
    imageUrl: string;
    category: {
        id?: {
            _id?: string;
            name?: string;
        }
    };
    brand: {
        id: {
            _id: string;
            name: string;
        }
    };
}


export type UpdateProductModalPropsType = {
    modalId: string;
    header: string;
    currentProduct: any;
    categories: {
        _id: string;
        name: string;
    }[];
    brands: {
        _id: string;
        name: string;
    }[];
}


export type ProductModalPropsType = {
    modalId: string;
    product: ManageProductType
}