import { createReducer } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AuthReducerStateType, AuthReducerUserType } from '../../types/redux-types/authReduer.types'
// import type { RootState } from '../store'



const initialState = {
    isLoading: false,
    isAuthenticate: false,
    isAdmin: false,
    isManager: false,
    isUser: false,
    accessToken: "",
    accountStatus: '',
    userInfo: {
        _id: "",
        name: '',
        email: '',
        phone: '',
        image: ''
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
    setUserInfo: (state, action: PayloadAction<AuthReducerUserType>) => {
        state.userInfo._id = action.payload._id
        state.userInfo.name = action.payload.name
        state.userInfo.email = action.payload.email
        state.userInfo.phone = action.payload.phone
        state.userInfo.image = action.payload.image
    },
    accessToken: (state, action: PayloadAction<string>) => {
        state.accessToken = action.payload
    },
    logOutUser: (state, action) => {
        state.isAuthenticate = false;
        state.isLoading = false;
        state.isAdmin = false;
        state.isManager = false;
        state.isUser = false;
        state.userInfo = {
            _id: "",
            name: '',
            email: '',
            phone: '',
            image: ''
        };
        state.accessToken = "";
    },
})

export default authReducer;