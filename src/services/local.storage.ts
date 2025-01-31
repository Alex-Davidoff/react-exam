import { ILoginResponse } from "../models/IApiReqRes";

export const setLSUser = (user: ILoginResponse):void => {
    localStorage.setItem('user',JSON.stringify(user));
}

export const getLSUser = ():ILoginResponse | null => {
    const user = localStorage.getItem('user');
    return user ? (JSON.parse(user) as ILoginResponse) : null;
}

export const setLSSearchParams = (spName: string, spParams: string) => {
    localStorage.setItem(spName, JSON.stringify(spParams));
}

export const getLSSearchParams = (spName: string): Record<string, string | string[]> => {
    const sp = localStorage.getItem(spName);
    return sp ? (JSON.parse(sp) as Record<string, string | string[]>) : {skip: '0', limit: '30'};
}