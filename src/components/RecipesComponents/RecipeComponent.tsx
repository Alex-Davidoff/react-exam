import { IRecipe } from "../../models/IRecipe"

interface IRecipeProps {
    recipe: IRecipe
}

export const RecipeComponent = ({recipe}: IRecipeProps) => {
    return(
        <div className="component_recipe">

        </div>
    )
}