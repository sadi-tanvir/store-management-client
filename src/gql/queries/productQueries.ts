import { gql } from '@apollo/client';


export const GET_PRODUCTS = gql`
  query getProducts {
        products {
            _id
            name
            imageUrl
            brand {
                id {
                  _id
                  name
                }
            }
            category {
                id {
                  _id
                  name
                }
            }
        }
    }
`;


export const GET_PRODUCTS_FOR_REFERENCES = gql`
  query getProducts {
          products {
              _id
              name
          }
    }
`
