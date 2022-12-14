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
                createdAt
                updatedAt
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

export const USER_DELETE_BY_ID_MUTATION = gql`
    mutation deleteUserById($id:ID!) {
        deleteUserById(id:$id) {
            status
        }
    }
`

export const UPDATE_OWNER_PROFILE = gql`
    mutation updateOwnerProfile($info:updateOwnerProfileInput!) {
        updateOwnerProfile(userData:$info){
            status
            message
        }
    }
`

export const CHANGE_USER_PASSWORD = gql`
    mutation changeUserPassword($id:ID!,$info:UserPasswordInput!) {
        changeUserPassword(id:$id, data:$info){
            status
            message
        }
    }
`