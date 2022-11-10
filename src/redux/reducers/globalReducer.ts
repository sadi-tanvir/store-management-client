import { createReducer } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface CounterState {
    darkMode: boolean;
    cartState: boolean;
}

const initialState = {
    darkMode: false,
    cartState: false,
} as CounterState

const globalReducer = createReducer(initialState, {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
        state.darkMode = action.payload
    },
    setCart: (state, action) => {
        state.cartState = !state.cartState
    },
})


// Other code such as selectors can use the imported `RootState` type

export default globalReducer