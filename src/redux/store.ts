import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { userSlice } from "./slices/userSlice";
import { recipeSlice } from "./slices/recipeSlice";
import { currentUserSlice } from "./slices/currentUserSlice";

export const store = configureStore({
    reducer: {
        currentUserStoreSlice: currentUserSlice.reducer, //move to LS... Page Reload === lost current user data
        userStoreSlice: userSlice.reducer,
        recipeStoreSlice: recipeSlice.reducer
    }
})

export const useMainDispatch = useDispatch.withTypes<typeof store.dispatch>();
export const useMainSelector = useSelector.withTypes<ReturnType<typeof store.getState>>();