import { gql } from "@apollo/client"

export const CREATE_PRODUCT_MUTATION = gql`
        mutation createProduct($info: ProductInputData!) {
            createProduct(data: $info){
                status
                message
            }
        }
`;

export const DELETE_PRODUCT_MUTATION = gql`
    mutation deleteProductById($id:ID!) {
        deleteProductById(id:$id){
            status
            message
        }
    }
`;

export const UPDATE_PRODUCT_MUTATION = gql`
    mutation updateProductById($id:ID!, $info:ProductInputData!) {
        updateProductById(id:$id, data:$info){
            status
            message
        }
}`;