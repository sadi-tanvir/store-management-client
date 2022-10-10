import { gql } from "@apollo/client"


export const USER_LOGIN_MUTATION = gql`
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

export const USER_REGISTER_MUTATION = gql`
    mutation createUser($info:UserSignUpInput!) {
        signUpUser(userData:$info){
            status
            message
            user {
            name
                email
                password
                phone
            }
        }
    }
`