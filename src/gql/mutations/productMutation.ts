import { gql } from "@apollo/client"

export const CREATE_PRODUCT_MUTATION = gql`
        mutation createProduct($info: ProductInputData!) {
            createProduct(data: $info){
                status
                message
            }
        }
`;




