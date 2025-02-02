import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import { getAuthData } from "../../services/api.service";
import { IUsersResponse } from "../../models/IApiReqRes";

type IUsersSliceType = {
    users: IUser[],
    total: number
}

const initUserSliceState: IUsersSliceType = {
    users: [],
    total: 0
}

const loadUsers = createAsyncThunk<IUsersSliceType, URLSearchParams>('loadUsers', async (searchParams, thunkApi) => {
    const findQuery = searchParams.get('q') || '';
    if (findQuery) {
        const {users, total} = await getAuthData<IUsersResponse>('/users/search', searchParams.toString());
        return thunkApi.fulfillWithValue({users, total});
    } else {
        const {users, total} = await getAuthData<IUsersResponse>('/users', searchParams.toString());
        return thunkApi.fulfillWithValue({users, total});
    }
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