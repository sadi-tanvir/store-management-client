

export type StocksType = {
    _id: string,
    name: string;
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