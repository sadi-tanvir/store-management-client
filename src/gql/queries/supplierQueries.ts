import { gql } from '@apollo/client';


export const GET_SUPPLIERS = gql`
  query suppliers {
    suppliers {
        _id
        name
    }
}`;