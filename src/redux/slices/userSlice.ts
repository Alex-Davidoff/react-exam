import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import { getAll } from "../../services/api.service";

type UserSliceType = {
    users: IUser[];
}

const initUserSliceState: UserSliceType = {users: []}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: initUserSliceState,
    reducers: {},
    extraReducers: builder => builder.addCase(loadUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
        state.users = action.payload;
    })
})

const loadUsers = createAsyncThunk('loadUsers', async (_, thunkApi) => {
    const users = await getAll<IUser[]>('/users');
    return thunkApi.fulfillWithValue(users);
})

export const userActions = {...userSlice.actions, loadUsers}