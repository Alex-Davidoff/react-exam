import { ILoginResponse } from "../models/IApiReqRes";

export const setLSUser = (user: ILoginResponse | null):void => {
    if (user) {localStorage.setItem('user',JSON.stringify(user))}
    else {localStorage.setItem('user', '')}
}

export const getLSUser = ():ILoginResponse | null => {
    const user = localStorage.getItem('user');
    return user ? (JSON.parse(user) as ILoginResponse) : null;
}