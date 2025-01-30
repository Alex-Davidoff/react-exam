import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import { getAll } from "../../services/api.service";
import { FetchParams, IUsersResponse } from "../../models/IApiReqRes";

type IUsersSliceType = {
    users: IUser[],
}

const initUserSliceState: IUsersSliceType = {
    users: []
}

const loadUsers = createAsyncThunk<IUser[], FetchParams>('loadUsers', async ({skip, limit}, thunkApi) => {
    console.log(skip, limit);
    
    const {users} = await getAll<IUsersResponse>('/users');
    return thunkApi.fulfillWithValue(users);
})

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: initUserSliceState,
    reducers: {},
    extraReducers: builder => builder.addCase(loadUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
        state.users = action.payload;
    })
})

export const userActions = {...userSlice.actions, loadUsers}