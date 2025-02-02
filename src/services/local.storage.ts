import { ILoginResponse } from "../models/IApiReqRes";

export const setLSUser = (user: ILoginResponse):void => {
    localStorage.setItem('user',JSON.stringify(user));
}

export const getLSUser = ():ILoginResponse | null => {
    const user = localStorage.getItem('user');
    return user ? (JSON.parse(user) as ILoginResponse) : null;
}