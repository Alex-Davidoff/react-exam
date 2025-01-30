import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { userSlice } from "./slices/userSlice";
import { recipeSlice } from "./slices/recipeSlice";

export const store = configureStore({
    reducer: {
        userStoreSlice: userSlice.reducer,
        recipeStoreSlice: recipeSlice.reducer
    }
})

export const useMainDispatch = useDispatch.withTypes<typeof store.dispatch>();
export const useMainSelector = useSelector.withTypes<ReturnType<typeof store.getState>>();