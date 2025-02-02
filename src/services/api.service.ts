import { ILoginResponse, ITokensPair, IUserLoginPass } from "../models/IApiReqRes";
import { getLSUser, setLSUser } from "./local.storage";

export const getAuthData = async <T,> (endpoint:string, searchParams: string) => {
    try {
        const responseObj = await getAll<T>(endpoint, searchParams);
        return responseObj as T;
    } catch {
        try {
            await refreshTokens();
            const responseObj = await getAll<T>(endpoint, searchParams);
            return responseObj as T;
        } catch {
            return null
        }
    }
}

const refreshTokens = async (): Promise<void> =>{
    const cuser = getLSUser();
    if (cuser) {
        const oldRefreshToken = cuser.refreshToken;
        const refreshResponse: ITokensPair = await fetch(import.meta.env.VITE_API_URL+'/auth/refresh', 
            {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              refreshToken: oldRefreshToken,
              expiresInMins: import.meta.env.VITE_TOKEN_LIFETIME, 
            })
        })
        .then((res) =>(res.json()));
        if (refreshResponse) {
            cuser.accessToken = refreshResponse.accessToken;
            cuser.refreshToken = refreshResponse.refreshToken;
            setLSUser(cuser);         
        }
    }
}

export const getAll =  async <T,> (endpoint:string, searchParams: string) => {
    let sp = '';
    if (searchParams) {sp = '?'+searchParams};
    const cuser = getLSUser();
    if (cuser) {
        const accessToken = cuser.accessToken;
        const response = await fetch(import.meta.env.VITE_API_URL+'/auth'+endpoint+sp,
        {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer '+accessToken, 
            }
        })
        if (response.ok) {
            return response.json() as T; 
        } else {
            throw new Error(`Err ${response.status}`)
        }
    }
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