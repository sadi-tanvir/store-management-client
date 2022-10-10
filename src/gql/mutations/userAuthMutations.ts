import { gql } from "@apollo/client"


export const LOGIN_USER_MUTATION = gql`
    mutation loginUser($info:UserSignInInput!) {
        signInUser(userData:$info){
            status
            message
            user {
                _id
                name
                email
                phone
                image
                role
                accountStatus
            }
        }
    }
`