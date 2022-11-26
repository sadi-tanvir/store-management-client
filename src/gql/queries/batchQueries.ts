import { gql } from '@apollo/client';


export const GET_ALL_ACTIVE_BATCHES = gql`
    query getAllOpenBatches {
      getAllOpenBatches {
        _id                                                                                                        
        batchNo
        description
        previousAmount
        status
        userId {
          _id
          firstName
          lastName
          email
        }
        createdAt
        updatedAt
      }
    }
`;

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
        createdAt
        updatedAt
      }
    }
`;

export const GET_BATCH_BY_ID = gql`
    query getBatchById($batchId:ID!) {
      getBatchById(batchId:$batchId) {
        _id                                                                                                        
        batchNo
        description
        previousAmount
        status
        userId {
          _id
          email
        }
        createdAt
        updatedAt
      }
    }
`;