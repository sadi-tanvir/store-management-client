import { gql } from '@apollo/client';


export const GET_PRODUCTS = gql`
  query getProducts {
        products {
            _id
            name
            imageUrl
            brand {
                name
            }
        }
    }
`;
