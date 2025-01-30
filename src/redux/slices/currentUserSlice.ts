import { createSlice } from "@reduxjs/toolkit";
import { ILoginResponse } from "../../models/IApiReqRes";

type CurrentUserSliceType = {
    c_user: ILoginResponse;
}

const initCurrentUserSliceState: CurrentUserSliceType = 
    {c_user: {
        id: 0,
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        gender: '',
        image: '',
        accessToken: '',
        refreshToken: '',
    }}

export const currentUserSlice = createSlice({
    name: 'currentUserSlice',
    initialState: initCurrentUserSliceState,
    reducers: {
        setCurrentUser: (state, action) => {
        state.c_user = action.payload;
      }}
})

export const currentUserActions = {...currentUserSlice.actions};