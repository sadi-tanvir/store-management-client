import { gql } from "@apollo/client"

export const CREATE_BATCH_MUTATION = gql`
    mutation createBatch($info:BatchInputData!) {
        createBatch(data:$info){
            status
            message
        }
    }
`;