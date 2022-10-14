import { gql } from '@apollo/client';


export const SET_DARK_MODE = gql`
  query setDarkMode{
    darkMode
  }
`;