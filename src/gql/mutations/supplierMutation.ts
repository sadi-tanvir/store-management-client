import { gql } from "@apollo/client"

export const CREATE_SUPPLIER_MUTATION = gql`
    mutation createSupplier($info:SupplierInput!) {
    createSupplier(data:$info){
            status
            message
        }
    }
`;