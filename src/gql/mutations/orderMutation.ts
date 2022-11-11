import { gql } from "@apollo/client"

export const CREATE_ORDER_MUTATION = gql`
    mutation createOrder($info:OrderInputData!) {
        createOrder(data:$info){
            status
            message
        }
    }
`;