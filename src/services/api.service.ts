export const getAll =  async <T,> (endpoint:string) => {
    const responseRes = await fetch(import.meta.env.VITE_API_URL+endpoint)
    .then((response) => response.json());
    console.log(responseRes);
    return responseRes as T;
}