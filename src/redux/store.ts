import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./reducers/authReducer";
import globalReducer from "./reducers/globalReducer";
import counterReducer from "./reducers/counterReducer";
import userEditReducer from "./reducers/userEditReducer";
import brandEditReducer from "./reducers/brandEditReducer";
import cartReducer from "./reducers/cartReducer";

export const store = configureStore({
    reducer: {
        authReducer,
        globalReducer,
        counterReducer,
        userEditReducer,
        brandEditReducer,
        cartReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch