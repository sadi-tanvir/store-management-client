import { gql } from '@apollo/client';


export const GET_ORDERS = gql`
    query orders {
    orders {
        _id
        userId {
          _id
          email
        }
        email
        phone
        address
        amount
        paymentStatus
        trxId
        orderStatus
        products {
          _id
          name
          qty
          price
          imageUrl
          category
          brand
          unit
          stockId {
            _id
            name
        }
      }
    }
  }
`;


export const GET_ORDERS_BY_BATCH_AND_USER = gql`
    query getOrdersByBatchAndUserId($batchId:ID!, $userId:ID!) {
        getOrdersByBatchAndUserId(batchId:$batchId, userId:$userId) {
              _id
              userId {
                _id
                email
              }
              batchRef {
                _id
                batchNo
              }
              email
              phone
              address
              amount
              paymentStatus
              trxId
              orderStatus
              products {
                _id
                name
                qty
                price
                imageUrl
                category
                brand
                unit
                stockId {
                  _id
                  name
              }
            }
          }
  }
`;