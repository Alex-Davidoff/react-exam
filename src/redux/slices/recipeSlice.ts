import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IRecipe } from "../../models/IRecipe";
import { getAll } from "../../services/api.service";

type RecipeSliceType = {
    recipes: IRecipe[];
}

const initRecipeSliceState: RecipeSliceType = {recipes: []}

export const recipeSlice = createSlice({
    name: 'recipeSlice',
    initialState: initRecipeSliceState,
    reducers: {},
    extraReducers: builder => builder.addCase(loadRecipes.fulfilled, (state, action: PayloadAction<IRecipe[]>) => {
        state.recipes = action.payload;
    })
})

const loadRecipes = createAsyncThunk('loadUsers', async (_, thunkApi) => {
    const recipes = await getAll<IRecipe[]>('/recipes');
    return thunkApi.fulfillWithValue(recipes);
})

export const userActions = {...recipeSlice.actions, loadRecipes}