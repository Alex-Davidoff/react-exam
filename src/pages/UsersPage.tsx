import { useEffect } from "react";
import MenuComponent from "../components/MenuComponent/MenuComponent"
import UsersComponent from "../components/UsersComponents/UsersComponent"
import { useMainDispatch, useMainSelector } from "../redux/store";
import { userActions } from "../redux/slices/userSlice";

export const UsersPage = () => {
    const dispatch = useMainDispatch();
    const users = useMainSelector((state) => state.userStoreSlice.users);

    useEffect(() => {
        dispatch(userActions.loadUsers());        
    },[]);

    return(
        <div className="page_users">
            <MenuComponent/>
            <UsersComponent users={users}/>
        </div>
    )
}