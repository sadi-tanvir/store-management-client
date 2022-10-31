import { gql } from '@apollo/client';


export const SET_DARK_MODE = gql`
  query setDarkMode{
    darkMode
  }
`;

export const GET_USERS = gql`
  query getUsers {
    users {
      _id
      firstName
      lastName
      email
      image
      role
    }
  }
`;

export const GET_USER_BY_ID = gql`
query getUserById($id:ID!) {
  userById(id:$id) {
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

export const GET_OWNER_PROFILE = gql`
  query ownerProfile ($id:ID!){
    ownerProfile(id:$id){
      owner {
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
  }
`