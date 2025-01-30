import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import { getAll } from "../../services/api.service";
import { IUsersResponse } from "../../models/IApiReqRes";

type UserSliceType = {
    users: IUser[];
}

const initUserSliceState: UserSliceType = {users: []}

const loadUsers = createAsyncThunk('loadUsers', async (_, thunkApi) => {
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