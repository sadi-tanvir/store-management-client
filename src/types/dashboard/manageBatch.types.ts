export type ManageOrderType = {
    _id: string;
    email: string;
    phone: string;
    address: string;
    amount: number;
    paymentStatus: string;
    trxId: string;
    orderStatus: string;
    userId: {
        _id: string;
        email: string;
    };
    batchRef: {
        _id: string;
        batchNo: string;
    };
    products: {
        _id: string;
        name: string;
        qty: number;
        price: number;
        imageUrl: string;
        category: string;
        brand: string;
        unit: string;
        stockId: {
            _id: string;
            name: string;
        }
    }[];
}

export type UpdateOrderModalPropsType = {
    modalId: string;
    header: string;
    currentOrder: {
        id: string;
        paymentStatus: string;
        trxId: string;
        orderStatus: string;
    }
}

export type OrderDetailsPropsType = {
    modalId: string;
    order: ManageOrderType;
}


export type UserBatchCardProps = {
    batch: {
        _id: string,
        batchNo: string,
        createdAt: string,
        status: string,
        userId: {
            _id: string,
            email: string,
            firstName: string,
            lastName: string,
        }
    };
    isThisCard?: boolean;
    closeBatchById: (batchId: string) => void;
    reOpenBatchById?: (batchId: string) => void;
}