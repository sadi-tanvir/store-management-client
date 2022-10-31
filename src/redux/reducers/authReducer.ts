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
    ownerInfo: {
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
    setOwnerInfo: (state, action: PayloadAction<AuthReducerUserType>) => {
        state.ownerInfo._id = action.payload._id
        state.ownerInfo.firstName = action.payload.firstName
        state.ownerInfo.lastName = action.payload.lastName
        state.ownerInfo.email = action.payload.email
        state.ownerInfo.phone = action.payload.phone
        state.ownerInfo.image = action.payload.image
        state.ownerInfo.gender = action.payload.gender
        state.ownerInfo.currentAddress = action.payload.currentAddress
        state.ownerInfo.permanentAddress = action.payload.permanentAddress
        state.ownerInfo.dateOfBirth = action.payload.dateOfBirth
        state.ownerInfo.createdAt = action.payload.createdAt
        state.ownerInfo.updatedAt = action.payload.updatedAt
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
        state.ownerInfo = {
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