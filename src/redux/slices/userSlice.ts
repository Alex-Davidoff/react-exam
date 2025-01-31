import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import { getAll } from "../../services/api.service";
import { FetchParams, IUsersResponse } from "../../models/IApiReqRes";

type IUsersSliceType = {
    users: IUser[],
    total: number
}

const initUserSliceState: IUsersSliceType = {
    users: [],
    total: 0
}

const loadUsers = createAsyncThunk<IUsersSliceType, FetchParams>('loadUsers', async ({skip, limit}, thunkApi) => {
    const {users, total} = await getAll<IUsersResponse>('/users', skip, limit);
    return thunkApi.fulfillWithValue({users, total});
})

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: initUserSliceState,
    reducers: {},
    extraReducers: builder => builder.addCase(loadUsers.fulfilled, (state, action: PayloadAction<IUsersSliceType>) => {
        state.users = action.payload.users;
        state.total = action.payload.total;
    })
})

export const userActions = {...userSlice.actions, loadUsers}