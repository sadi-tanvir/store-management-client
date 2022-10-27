import { createReducer } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AuthReducerUserType, UserEditReducerType } from '../../types/redux-types/authReduer.types'



const initialState = {
    _id: "",
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    image: '',
    gender: '',
    role: '',
    accountStatus: '',
    currentAddress: '',
    permanentAddress: '',
    dateOfBirth: '',
} as UserEditReducerType



const userEditReducer = createReducer(initialState, {
    setUserEdit: (state, action: PayloadAction<AuthReducerUserType>) => {
        state._id = action.payload._id
        state.firstName = action.payload.firstName
        state.lastName = action.payload.lastName
        state.email = action.payload.email
        state.phone = action.payload.phone
        state.image = action.payload.image
        state.gender = action.payload.gender
        state.currentAddress = action.payload.currentAddress
        state.permanentAddress = action.payload.permanentAddress
        state.dateOfBirth = action.payload.dateOfBirth
        state.accountStatus = action.payload.accountStatus
        state.role = action.payload.role
    }
})

export default userEditReducer;