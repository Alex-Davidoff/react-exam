import { Link } from "react-router";
import { IRecipe } from "../../models/IRecipe";
import { RecipeTagsComponent } from "./RecipeTagsComponent";

interface IRecipesProps {
    recipes: IRecipe[],
}

const RecipesComponent = ({recipes}: IRecipesProps) => {
    if (recipes) {
    return(
        <div className="component_recipes">
            <ul>
            {recipes.map((recipe) => (
                    <li className="border border-orange-800 rounded-sm mb-0.5 pl-4 flex gap-8" key={recipe.id}>
                        <Link to={`/auth/recipes/${recipe.id}`}>{recipe.name}</Link>
                        <span className="recipe_tags">
                            <RecipeTagsComponent tags={recipe.tags}/>
                        </span>
                    </li>
            ))}
            </ul>
        </div>
    )}
};

export default RecipesComponent;