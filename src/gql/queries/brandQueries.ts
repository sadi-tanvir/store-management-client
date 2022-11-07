import { gql } from '@apollo/client';


export const GET_BRANDS = gql`
 query getBrands {
        brandsWithReference {
            _id
            name
            description
            email
            phone
            website
            status
            location
            products {
                _id
                name
            }
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

export const GET_BRAND_BY_ID = gql`
    query getBrandWithId($id:ID!) {
        getBrandWithId(id:$id) {
                _id
                name
                description
                email
                phone
                website
                status
                location
                products {
                    _id
                    name
                }
                suppliers {
                  id {
                    name
                    imageUrl
                  }
                }
        }
    }
`
