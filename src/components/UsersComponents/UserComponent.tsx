import { useSearchParams } from "react-router";
import { IUser } from "../../models/IUser"
import { useMainDispatch, useMainSelector } from "../../redux/store";
import { useEffect } from "react";
import { recipeActions } from "../../redux/slices/recipeSlice";
import RecipesComponent from "../RecipesComponents/RecipesComponent";

interface IUserProps {
    user: IUser
}

export const UserComponent = ({user}: IUserProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    searchParams.set('all', user.id.toString());
    setSearchParams(searchParams);
    console.log(searchParams.toString());

    const dispatch = useMainDispatch();
    const recipes = useMainSelector((state) => state.recipeStoreSlice.recipes);
    console.log('recipes',recipes);

    useEffect(() => {
        dispatch(recipeActions.loadRecipes(searchParams));         
    },[dispatch, searchParams]);

    if (user) {
    return(
        <div>
            <h2 className="italic text-2xl">{user.firstName} {user.lastName}</h2>
            <p>({user.username})</p>
            <img src={user.image} alt={`${user.firstName} ${user.lastName}`} />
            <h2>{user.age} {user.gender} {user.birthDate}</h2>
            <p>{user.phone}</p>
            <RecipesComponent recipes={recipes}/>
        </div>
    )}
} 