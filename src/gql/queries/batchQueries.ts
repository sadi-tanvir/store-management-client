import { gql } from '@apollo/client';


export const GET_BATCHES_BY_USER_REF = gql`
    query getBatchesByUserRef($id:ID!) {
      getBatchesByUserRef(userId:$id) {
        _id                                                                                                        
        batchNo
        description
        previousAmount
        status
        userId {
          _id
          email
        }
      }
    }
`;

export const GET_OPEN_BATCH_BY_USER_REF = gql`
    query getOpenBatchByUserRef($id:ID!) {
      getOpenBatchByUserRef(userId:$id) {
        _id                                                                                                        
        batchNo
        description
        previousAmount
        status
        userId {
          _id
          email
        }
      }
    }
`;