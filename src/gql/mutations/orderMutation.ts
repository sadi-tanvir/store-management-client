import { gql } from "@apollo/client"

export const CREATE_ORDER_MUTATION = gql`
    mutation createOrder($info:OrderInputData!) {
        createOrder(data:$info){
            status
            message
        }
    }
`;

export const DELETE_ORDER_MUTATION = gql`
    mutation deleteOrderById($id:ID!) {
        deleteOrderById(id:$id){
            status
            message
        }
    }
`;



export const UPDATE_ORDER_MUTATION = gql`
    mutation updateOrderById($id:ID!, $info:OrderUpdateInputData!) {
        updateOrderById(id:$id, data:$info){
            status
            message
        }
    }
`;