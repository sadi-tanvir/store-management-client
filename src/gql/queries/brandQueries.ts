import { gql } from '@apollo/client';


export const GET_BRANDS_1 = gql`
 query getBrands {
        brandsWithReference {
            _id
            name
            email
            suppliers {
              id {
                name
                imageUrl
              }
            }
        }
    }
`;


export const GET_BRANDS_2 = gql`
  query getBrands {
        brands {
            _id
            name
        }
    }
`;