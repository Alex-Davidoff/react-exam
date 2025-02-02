import { Link } from "react-router";
import { IRecipe } from "../../models/IRecipe";

interface IRecipesProps {
    recipes: IRecipe[]
}

const RecipesComponent = ({recipes}: IRecipesProps) => {
    return(
        <div className="component_recipes">
            <ul>
            {recipes.map((recipe) => (
                    <li className="border border-orange-800 rounded-sm mb-0.5 pl-4 flex gap-4" key={recipe.id}>
                        <Link to={`/auth/recipes/${recipe.id}`}>{recipe.name}</Link>
                        <p className="recipe_tags">
                            tags
                        </p>
                    </li>
            ))}
            </ul>
        </div>
    )
};

export default RecipesComponent;