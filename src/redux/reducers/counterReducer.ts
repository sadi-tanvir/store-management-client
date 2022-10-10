import { createReducer, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface CounterState {
    value: number
}

const initialState = {
    value: 0,
} as CounterState

export const counterSlice = createReducer(initialState, {
    increment: (state, action) => {
        state.value += 1
    },
    decrement: (state, action) => {
        state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
        state.value += action.payload
    },
})


// Other code such as selectors can use the imported `RootState` type

export default counterSlice