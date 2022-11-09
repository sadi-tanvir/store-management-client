import { gql } from '@apollo/client';

export const GET_SUPPLIERS_WITH_DETAILS = gql`
  query suppliers {
    suppliers {
      _id
      name
      email
      contactNumber
      presentAddress
      permanentAddress
      status
      imageUrl
      brand {
        id {
          _id
          name
        }
      }
    }
}`;

export const GET_SUPPLIERS = gql`
  query suppliers {
    suppliers {
        _id
        name
        email
        contactNumber
    }
}`;