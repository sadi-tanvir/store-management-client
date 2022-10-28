import { createReducer } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AuthReducerStateType, AuthReducerUserType } from '../../types/redux-types/authReduer.types'
// import type { RootState } from '../store'



const initialState = {
    isLoading: false,
    isAuthenticate: false,
    role: "",
    isAdmin: false,
    isManager: false,
    isUser: false,
    accessToken: "",
    accountStatus: '',
    userInfo: {
        _id: "",
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        image: '',
        gender: '',
        currentAddress: '',
        permanentAddress: '',
        dateOfBirth: '',
        createdAt: '',
        updatedAt: ''
    },
} as AuthReducerStateType



const authReducer = createReducer(initialState, {
    loginUser: (state, action) => {
        state.isAuthenticate = true
    },
    accessAdmin: (state, action) => {
        state.isAdmin = true
    },
    accessManager: (state, action) => {
        state.isManager = true
    },
    accessUser: (state, action) => {
        state.isUser = true;
    },
    accountStatus: (state, action) => {
        state.accountStatus = action.payload
    },
    userRole: (state, action) => {
        state.role = action.payload
    },
    setUserInfo: (state, action: PayloadAction<AuthReducerUserType>) => {
        state.userInfo._id = action.payload._id
        state.userInfo.firstName = action.payload.firstName
        state.userInfo.lastName = action.payload.lastName
        state.userInfo.email = action.payload.email
        state.userInfo.phone = action.payload.phone
        state.userInfo.image = action.payload.image
        state.userInfo.gender = action.payload.gender
        state.userInfo.currentAddress = action.payload.currentAddress
        state.userInfo.permanentAddress = action.payload.permanentAddress
        state.userInfo.dateOfBirth = action.payload.dateOfBirth
        state.userInfo.createdAt = action.payload.createdAt
        state.userInfo.updatedAt = action.payload.updatedAt
    },
    accessToken: (state, action: PayloadAction<string>) => {
        state.accessToken = action.payload
    },
    logOutUser: (state, action) => {
        state.isAuthenticate = false;
        state.isLoading = false;
        state.isAdmin = false;
        state.role = "";
        state.isManager = false;
        state.isUser = false;
        state.userInfo = {
            _id: "",
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            image: '',
            gender: '',
            currentAddress: '',
            permanentAddress: '',
            dateOfBirth: '',
            createdAt: '',
            updatedAt: ''
        };
        state.accountStatus = "";
        state.accessToken = "";
    },
})

export default authReducer;