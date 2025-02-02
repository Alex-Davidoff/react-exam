import { useSearchParams } from "react-router";
import { useMainDispatch, useMainSelector } from "../redux/store";
import { useEffect } from "react";
import SearchComponent from "../components/SearchComponent/SearchComponent";
import { PaginationComponent } from "../components/PaginationComponent/PaginationComponent";
import RecipesComponent from "../components/RecipesComponents/RecipesComponent";
import { recipeActions } from "../redux/slices/recipeSlice";

export const RecipesPage = () => {
    const dispatch = useMainDispatch();
    const recipes = useMainSelector((state) => state.recipeStoreSlice.recipes);
    const recipes_total = useMainSelector((state) => state.recipeStoreSlice.total);
    
    let recipes_count = 0;
    if (recipes) {recipes_count = recipes.length};
    const lsName = 'Recipes';

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        dispatch(recipeActions.loadRecipes(searchParams));         
    },[searchParams]);


    return(
        <div key="recipes" className="page_recipes">
            <SearchComponent searchBy={lsName}/>
            <RecipesComponent recipes={recipes} userid={0}/>
            <PaginationComponent arrayCount={recipes_count} arrayTotal={recipes_total}/>
        </div>
    )
}