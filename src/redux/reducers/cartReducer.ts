import { createReducer } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'


const initialState = {
    cart: {},
}

export type CartPayloadType = {
    stockId: string,
    name: string,
    category: string,
    brand: string,
    imageUrl: string,
    price: number,
    qty: number,
    unit: string
}

const cartReducer = createReducer(initialState, {
    // add product to the cart
    addToCart: (state, action: PayloadAction<CartPayloadType>) => {
        const { stockId } = action.payload;
        let newCart: any = state.cart;

        if (stockId in state.cart) {
            newCart[stockId].qty = newCart[stockId].qty + 1
        } else {
            newCart[stockId] = { ...action.payload }
        }

        state.cart = newCart
        localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    removeFromCart: (state, action: PayloadAction<{ stockId: string }>) => {
        const { stockId } = action.payload
        let newCart: any = state.cart


        if (stockId in newCart) {
            newCart[stockId].qty = newCart[stockId].qty - 1
        } if (newCart[stockId].qty <= 0) {
            delete newCart[stockId]
        }

        state.cart = newCart
        localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    removeItemFromCart: (state, action: PayloadAction<{ stockId: string }>) => {
        const { stockId } = action.payload
        let newCart: any = state.cart

        if (stockId in newCart) {
            delete newCart[stockId]
        }

        state.cart = newCart
        localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    clearCart: (state, action) => {
        state.cart = {}
        localStorage.removeItem('cart')
    }

})

export default cartReducer