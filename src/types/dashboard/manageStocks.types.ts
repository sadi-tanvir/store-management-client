export type StockCommonType = {
    id: {
        _id: string;
        name: string;
    }
}

export type ManageStockType = {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    status: string;
    unit: string;
    quantity: number;
    sellCount: number;
    category: StockCommonType;
    brand: StockCommonType;
    suppliedBy: StockCommonType;
}



export type UpdateStockModalPropsType = {
    modalId: string;
    header: string;
    currentStock: ManageStockType;
    categories: {
        id: string;
        name: string;
    }[];
    brands: {
        id: string;
        name: string;
    }[];
    suppliers: {
        id: string;
        name: string;
        brandName: string;
    }[];
}


export type StockDetailsPropsType = {
    modalId: string;
    stock: ManageStockType;
}