import { ILoginResponse, ITokensPair, IUserLoginPass } from "../models/IApiReqRes";
import { getLSUser, setLSUser } from "./local.storage";

export const getAuthData = <T,> (endpoint:string, searchParams: string) => {
    try {
        const responseObj = getAll<T>(endpoint, searchParams);
        return responseObj as T;
    } catch {
        try {
            refreshTokens();
            const responseObj = getAll<T>(endpoint, searchParams);
            return responseObj as T;
        } catch {
            return null
        }
    }
}

const refreshTokens = (): void =>{
    let cuser = getLSUser();
    
    const oldRefreshToken = cuser?.refreshToken;
    const {accessToken, refreshToken} = fetch(import.meta.env.VITE_API_URL+'/auth/refresh', 
        {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          refreshToken: oldRefreshToken,
          expiresInMins: import.meta.env.VITE_TOKEN_LIFETIME, 
        })
      })
      .then((res) =>(res.json()))
    cuser?.accessToken = accessToken;


}

export const getAll =  async <T,> (endpoint:string, searchParams: string) => {
    let sp = '';
    if (searchParams) {sp = '?'+searchParams};
    const cuser = getLSUser();
    const accessToken = cuser?.accessToken;
    const responseRes = await fetch(import.meta.env.VITE_API_URL+'/auth'+endpoint+sp,
        {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer '+accessToken, 
            }
        }
    )
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