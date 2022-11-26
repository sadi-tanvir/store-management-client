import { gql } from '@apollo/client';


export const GET_STOCKS = gql`
    query getStocks {
        stocks {
            _id
            name
            description
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

export const GET_STOCKS_BY_CATEGORY = gql`
    query getStocksByCategory($category: String!) {
  getStocksByCategory(category: $category) {
            _id
            name
            description
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

export const GET_STOCKS_WITH_DETAILS = gql`
     query getStocksWithDetails {
        getStocksWithDetails {
            _id
            name
            description
            price
            imageUrl
            status
            unit
            quantity
            sellCount
            category {
              id {
                _id
                name
              }
            }
            brand {
               id {
                _id
                name
              }
            }
          suppliedBy {
            id {
              _id
              name
            }
          }
        }
    }
`;



