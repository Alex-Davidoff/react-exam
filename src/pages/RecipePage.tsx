import { useParams } from "react-router";
import { useMainSelector } from "../redux/store";
import { RecipeComponent } from "../components/RecipesComponents/RecipeComponent";

export const RecipePage = () => {
    const {id} = useParams();

    const recipes = useMainSelector((state) => state.recipeStoreSlice.recipes);

    if (recipes){
    return(
        <div className="page_recipe">
            {recipes.filter((recipe) => (recipe.id===Number(id)))
            .map((recipe) => <RecipeComponent key={recipe.id} recipe={recipe}/>)}
        </div>
    )}
}