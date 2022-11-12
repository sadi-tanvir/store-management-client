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