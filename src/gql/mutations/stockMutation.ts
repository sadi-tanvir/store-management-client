import { gql } from "@apollo/client"

export const CREATE_STOCK_MUTATION = gql`
    mutation createStock($info: StockInputData!) {
        createStock(data: $info){
            status
            message
            stock {
                name
                description
                price
            }
        }
    }
`;


export const UPDATE_STOCK_QUANTITY_MUTATION = gql`
    mutation updateStockQuantity($id:ID!, $info:StockUpdateInfo!) {
        updateStockQuantity(id:$id, data:$info){
            status
            message
        }
    }
`;

export const UPDATE_STOCK_MUTATION = gql`
    mutation updateStockById($id:ID!, $info:StockInputData!) {
        updateStockById(id:$id, data:$info){
            status
            message
        }
    }
`;

export const DELETE_STOCK_MUTATION = gql`
    mutation deleteStockById($id:ID!) {
        deleteStockById(id:$id){
            status
            message
        }
    }
`;