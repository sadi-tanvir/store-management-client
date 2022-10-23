import { gql } from '@apollo/client';


export const SET_DARK_MODE = gql`
  query setDarkMode{
    darkMode
  }
`;

export const GET_USERS = gql`
  query findUsers {
    users {
      _id
      name
      email
    }
  }
`;