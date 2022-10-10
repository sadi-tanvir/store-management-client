import { createReducer } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface CounterState {
    dark: boolean
}

const initialState = {
    dark: false,
} as CounterState

const globalReducer = createReducer(initialState, {
    dark: (state, action) => {
        state.dark = !state.dark
    }
})


// Other code such as selectors can use the imported `RootState` type

export default globalReducer