import { gql } from "@apollo/client"

export const CREATE_BATCH_MUTATION = gql`
    mutation createBatch($info:BatchInputData!) {
        createBatch(data:$info){
            status
            message
        }
    }
`;

export const CLOSE_BATCH_MUTATION = gql`
    mutation closeBatch($batchId:ID!) {
        closeBatch(batchId:$batchId){
            status
            message
        }
    }
`;

export const RE_OPEN_BATCH_MUTATION = gql`
    mutation reopenBatch($batchId:ID!) {
        reopenBatch(batchId:$batchId){
            status
            message
        }
    }
`;