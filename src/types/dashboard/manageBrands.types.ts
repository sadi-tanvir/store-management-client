export type ManageBrandType = {
    _id: string;
    name: string;
    description: string;
    email: string;
    phone: string;
    website: string;
    status: string;
    location: string;
    products: {
        _id: string;
        name: string;
    }[];
    suppliers: {
        id: {
            name: string;
            imageUrl: string
        };
    }[];
}

export type BrandModalPropsType = {
    modalId: string;
    brand: ManageBrandType;
}

export type UpdateBrandModalPropsType = {
    modalId: string;
    header: string;
    products: BrandProductType[];
    suppliers: BrandSupplierType[];
    currentBrand: ManageBrandType;
}

export type BrandSupplierType = {
    id: string;
    name: string;
    email: string;
    phone?: string;
}

export type BrandProductType = {
    _id: string;
    name: string;
}

