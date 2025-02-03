import { Link } from "react-router"
import { IRecipe } from "../../models/IRecipe"
import { RecipeArrayStringsComponent } from "./RecipeArrayStringsComponent"
import { RecipeTagsComponent } from "./RecipeTagsComponent"

interface IRecipeProps {
    recipe: IRecipe
}

export const RecipeComponent = ({recipe}: IRecipeProps) => {
    if (recipe){
    return(
        <div className="component_recipe">
            <h2 className="italic text-2xl">{recipe.name}</h2>
            <span className="flex gap-4 flex-wrap">
            <p>prepTimeMinutes: {recipe.prepTimeMinutes}</p>
            <p>cookTimeMinutes: {recipe.cookTimeMinutes}</p>
            <p>servings: {recipe.servings}</p>
            <p>difficulty: {recipe.difficulty}</p>
            <p>cuisine: {recipe.cuisine}</p>
            <p>caloriesPerServing: {recipe.caloriesPerServing}</p>
            <p>rating: {recipe.rating}</p>
            <p>reviewCount: {recipe.reviewCount}</p>
            </span>
            <RecipeTagsComponent tags={recipe.tags}/>
            <img src={recipe.image} alt={recipe.name} className="size-120 mx-auto"/>
            <span>ingredients: <RecipeArrayStringsComponent arrstr={recipe.ingredients}/>
            </span>
            <span>instructions: <RecipeArrayStringsComponent arrstr={recipe.instructions}/>
            </span>
            <span>mealType: <RecipeArrayStringsComponent arrstr={recipe.mealType}/>
            </span>
            <p className="underline"><Link to={`/auth/users/${recipe.userId}`}>To author</Link></p>
        </div>
    )}
}