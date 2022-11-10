export type ManageSupplierType = {
    _id: string;
    name: string;
    email: string;
    contactNumber: string;
    presentAddress: string;
    permanentAddress: string;
    status: string;
    imageUrl: string;
    brand: {
        id: {
            _id: string;
            name: string;
        }
    }
}

export type SupplierModalPropsType = {
    modalId: string;
    supplier: ManageSupplierType
}

export type UpdateSupplierModalPropsType = {
    modalId: string;
    header: string;
    currentSupplier: ManageSupplierType;
    brands: {
        _id: string;
        name: string;
    }[];
}