import { gql } from "@apollo/client"


export const USER_LOGIN_MUTATION = gql`
    mutation loginUser($info:UserSignInInput!) {
        signInUser(userData:$info){
            status
            message
            token
            user {
                _id
                firstName
                lastName
                email
                phone
                image
                role
                accountStatus
                darkMode
                gender
                currentAddress
                permanentAddress
                dateOfBirth
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
                firstName
                lastName
                email
                password
                phone
            }
        }
    }
`


export const USER_UPDATE_By_ADMIN_MUTATION = gql`
    mutation updateUserByAdmin($info:updateUserByAdminInput!) {
        updateUserByAdmin(userData:$info){
            status
            message
    }
}
`