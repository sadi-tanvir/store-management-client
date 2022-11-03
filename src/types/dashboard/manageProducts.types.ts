type commonType = {
    _id: string;
    name: string;
}

export type BrandCommonType = {
    _id: string;
    name: string;
}

export type CategoryCommonType = {
    _id: string;
    name: string;
}


export type StockModalPropsType = {
    modalId: string;
    header: string;
    products: StockProductType[];
    suppliers: commonType[];
}

export type StockProductType = {
    _id: string;
    name: string;
    imageUrl: string;
    brand: {
        id: {
            _id: string;
            name: string;
        }
    },
    category: {
        id: {
            _id: string;
            name: string;
        }
    }
}

export type ProductModalPropsType = {
    modalId: string;
    header: string;
    categories: CategoryCommonType[];
    brands: commonType[];
}

export type BrandSupplierType = {
    _id: string;
    name: string;
    email: string;
    contactNumber?: string;
}

export type BrandModalPropsType = {
    modalId: string;
    header: string;
    products: BrandCommonType[];
    suppliers: BrandSupplierType[];
}

export type CategoryModalPropsType = {
    modalId: string;
    header: string;
}