import { gql } from '@apollo/client';


export const GET_STOCKS = gql`
    query getStocks {
        stocks {
            _id
            name
            price
            imageUrl
            status
            unit
            quantity
            category {
                name
            }
            brand {
                name
            }
        }
    }
`;



