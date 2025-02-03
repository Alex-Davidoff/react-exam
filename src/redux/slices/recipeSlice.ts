import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IRecipe } from "../../models/IRecipe";
import { getAuthData } from "../../services/api.service";
import { IRecipesResponse } from "../../models/IApiReqRes";

type RecipeSliceType = {
    recipes: IRecipe[],
    total: number
}

const initRecipeSliceState: RecipeSliceType = {
    recipes: [],
    total: 0
}

const loadRecipes = createAsyncThunk('loadUsers', async (searchParams: URLSearchParams, thunkApi) => {
    const findQuery = searchParams.get('q') || '';
    const tagQuery = searchParams.get('tag') || '';
    const allQuery = searchParams.get('all') || '';
    if (findQuery) {
        if (findQuery.match(/[a-zA-Z]/g)) {
            const {recipes, total} = await getAuthData<IRecipesResponse>('/recipes/search', searchParams.toString());
            return thunkApi.fulfillWithValue({recipes, total});
        } else if (findQuery.match(/[0-9]/g)) {
            const oneRecipe = await getAuthData<IRecipesResponse>('/recipes/'+findQuery, '');
            if (oneRecipe) {
                const recipes = [oneRecipe];
                const total = 1;
                return thunkApi.fulfillWithValue({recipes, total});
            }
        }
    } else if (tagQuery){
        const {recipes, total} = await getAuthData<IRecipesResponse>('/recipes/tag/'+tagQuery, '');
        return thunkApi.fulfillWithValue({recipes, total});
    } else if (allQuery) {
        console.log('allQuery',allQuery);
        const allResp = await getAuthData<IRecipesResponse>('/recipes', 'limit=0');//&select=id,userId,name,tags
        console.log('sliceAllResp', allResp);
        if (allResp){
            console.log('sliceBeforefilter', allResp.recipes);
            const recipes = allResp.recipes.filter((recipe) => recipe.userId===Number(allQuery));
            const total = allResp.total;
            console.log('sliceAfterFilter', recipes);
            return thunkApi.fulfillWithValue({recipes, total});
        }
    } else {
        const {recipes, total} = await getAuthData<IRecipesResponse>('/recipes', searchParams.toString());
        return thunkApi.fulfillWithValue({recipes, total});
    }
})

export const recipeSlice = createSlice({
    name: 'recipeSlice',
    initialState: initRecipeSliceState,
    reducers: {},
    extraReducers: builder => builder.addCase(loadRecipes.fulfilled, (state, action: PayloadAction<RecipeSliceType>) => {
        state.recipes = action.payload.recipes;
        state.total = action.payload.total;
    })
})

export const recipeActions = {...recipeSlice.actions, loadRecipes}