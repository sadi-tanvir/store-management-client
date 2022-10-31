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