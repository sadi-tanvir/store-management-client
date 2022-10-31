import { gql } from '@apollo/client';


export const GET_STOCKS = gql`
    query getStocks {
        stocks {
            name
            price
            imageUrl
            status
            category {
                name
            }
        }
    }
`;



