import { IRecipe } from "./IRecipe";
import { IUser } from "./IUser";

interface IBaseResponseProps {
    total: number;
    skip: number;
    limit: number;
}

export interface IUsersResponse extends IBaseResponseProps {
    users: IUser[]
}

export interface IRecipesResponse extends IBaseResponseProps {
    recipes: IRecipe[]
}

export interface IUserLoginPass {
    username: string,
    password: string     
}

export interface IUserLoginPassExp extends IUserLoginPass {
    expiresInMins: number
}

export interface IRenewTokenProps {
    refreshToken: string,
    expiresInMins: number
}

interface ITokensPair {
    accessToken: string;
    refreshToken: string;
  }

export interface ILoginResponse extends ITokensPair{
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}