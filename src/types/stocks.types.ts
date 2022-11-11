

export type StockCardPropsType = {
    _id: string,
    name: string;
    description: string;
    price: number;
    status: string;
    imageUrl: string;
    unit: string;
    quantity: number;
    category: {
        name: string;
    }
    brand: {
        name: string;
    }
}