import { useEffect } from "react";
import MenuComponent from "../components/MenuComponent/MenuComponent"
import UsersComponent from "../components/UsersComponents/UsersComponent"
import { useMainDispatch, useMainSelector } from "../redux/store";
import { userActions } from "../redux/slices/userSlice";
import { useSearchParams } from "react-router";
import { PaginationComponent } from "../components/PaginationComponent/PaginationComponent";

export const UsersPage = () => {
    const dispatch = useMainDispatch();
    const users = useMainSelector((state) => state.userStoreSlice.users);
    const users_total = useMainSelector((state) => state.userStoreSlice.total);
    const users_count = users.length;

    


    const [searchParams, setSearchParams] = useSearchParams({skip:'0', limit: '30'});
    const skip:number = Number(searchParams.get('skip') || '0');
    const limit:number = Number(searchParams.get('limit') || '30');
    

    useEffect(() => {
        dispatch(userActions.loadUsers(searchParams.toString()));        
    },[skip, limit]);

    return(
        <div className="page_users">
            <MenuComponent/>
            <UsersComponent users={users}/>
            <PaginationComponent ucount={users_count} utotal={users_total}/>
        </div>
    )
}