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
      firstName
      lastName
      email
    }
  }
`;

export const GET_USER_BY_ID = gql`
query getUserById($id:ID!) {
  user(id:$id) {
      _id
      firstName
      lastName
      email
      password
      image
      phone
      role
      gender
      currentAddress
      permanentAddress
      dateOfBirth
      accountStatus
      createdAt
      updatedAt
    }
  }
`;