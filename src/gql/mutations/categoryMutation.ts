import { gql } from "@apollo/client"

export const CREATE_CATEGORY_MUTATION = gql`
        mutation createCategory($info:CategoryInputData!) {
            createCategory(data:$info){
                status
                message
            }
        }
`;


export const UPDATE_CATEGORY_MUTATION = gql`
    mutation updateCategoryById($id:ID!, $info:CategoryInputData!) {
        updateCategoryById(id:$id, data:$info){
            status
            message
        }
}`;

// deleteCategoryById