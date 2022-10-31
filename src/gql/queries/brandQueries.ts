import { gql } from '@apollo/client';


export const GET_BRANDS = gql`
  query getBrands {
        brands {
            _id
            name
        }
    }
`;


