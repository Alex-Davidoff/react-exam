//import { useEffect, useState } from "react";
import { ILoginResponse, IUserLoginPass } from "../models/IApiReqRes";

/*
export const useFetch = <T,>(endpoint: string, defaultValue: T) => {
    const [object, setObject] = useState<T>(defaultValue);

    useEffect( () => {
        fetch(import.meta.env.VITE_API_URL+endpoint)
        .then((response) => response.json())
        .then((json_response) => {
            setObject(json_response);    
        })

    },[])
    
    return object;
} */ //  , skip: number, limit: number
/*
export const getAll =  async <T,> (endpoint:string) => {
    const responseRes = await fetch(import.meta.env.VITE_API_URL+endpoint)
    .then((response) => response.json());
    console.log(responseRes);
    return responseRes as T;
} */

export const getAll =  async <T,> (endpoint:string, searchParams: string) => {
    let sp = '';
    if (searchParams) {sp = '?'+searchParams}
    const responseRes = await fetch(import.meta.env.VITE_API_URL+endpoint+sp)
    .then((response) => response.json());
    console.log(responseRes);
    return responseRes as T;
}

export const userLogin = async ({username, password}: IUserLoginPass): Promise<ILoginResponse | void> => {
    try {
        const data:ILoginResponse =  await fetch(import.meta.env.VITE_API_URL+'/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: username,
              password: password,
              expiresInMins: import.meta.env.VITE_TOKEN_LIFETIME, 
            })
          })
          .then(res => res.json())
        if (data) {
            return data;
        }
    } catch {
        console.log('login failed');
    }
}