type commonType = {
    _id: string;
    name: string;
}

export type StockModalPropsType = {
    modalId: string;
    header: string;
    products: {
        _id: string;
        name: string;
        imageUrl: string;
        brand: {
            name: string
        }
    }[];
    categories: commonType[];
    brands: commonType[];
    suppliers: commonType[];
}

export type ProductModalPropsType = {
    modalId: string;
    header: string;
    categories: commonType[];
    brands: commonType[];
}

export type BrandSupplierType = {
    _id: string;
    name: string;
    email: string;
    contactNumber?: string;
}
export type BrandProductType = {
    _id: string;
    name: string;
}
export type BrandModalPropsType = {
    modalId: string;
    header: string;
    products: BrandProductType[];
    suppliers: BrandSupplierType[];
}