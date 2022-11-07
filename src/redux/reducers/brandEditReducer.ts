import { createReducer } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AuthReducerUserType, UserEditReducerType } from '../../types/redux-types/authReduer.types'



const initialState = {
    _id: "",
    name: "",
    description: "",
    email: "",
    phone: "",
    website: "",
    location: "",
    status: "",
    products: [],
    suppliers: []
} as any



const brandEditReducer = createReducer(initialState, {
    setBrandEdit: (state, action: PayloadAction<any>) => {
        state._id = action.payload._id
        state.name = action.payload.name
        state.description = action.payload.description
        state.email = action.payload.email
        state.phone = action.payload.phone
        state.website = action.payload.website
        state.location = action.payload.location
        state.status = action.payload.status
        state.products = action.payload.products
        state.suppliers = action.payload.suppliers
    }
})

export default brandEditReducer;