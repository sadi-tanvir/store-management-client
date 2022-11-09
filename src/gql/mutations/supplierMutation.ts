import { gql } from "@apollo/client"

export const CREATE_SUPPLIER_MUTATION = gql`
    mutation createSupplier($info:SupplierInput!) {
    createSupplier(data:$info){
            status
            message
        }
    }
`;

export const DELETE_SUPPLIER_MUTATION = gql`
    mutation deleteSupplierById($id:ID!) {
        deleteSupplierById(id:$id){
            status
            message
        }
    }
`;


export const UPDATE_SUPPLIER_MUTATION = gql`
    mutation updateSupplierById($id:ID!, $info:SupplierUpdateInput!) {
        updateSupplierById(id:$id, data:$info){
            status
            message
        }
}`;