import { useEffect } from "react";
import MenuComponent from "../components/MenuComponent/MenuComponent"
import UsersComponent from "../components/UsersComponents/UsersComponent"
import { useMainDispatch, useMainSelector } from "../redux/store";
import { userActions } from "../redux/slices/userSlice";
import { useSearchParams } from "react-router";
import { PaginationComponent } from "../components/PaginationComponent/PaginationComponent";
import { getLSSearchParams, setLSSearchParams } from "../services/local.storage";

export const UsersPage = () => {
    const dispatch = useMainDispatch();
    const users = useMainSelector((state) => state.userStoreSlice.users);
    const users_total = useMainSelector((state) => state.userStoreSlice.total);
    const users_count = users.length;
    const lsName = 'spUsers';
    
    const [searchParams, setSearchParams] = useSearchParams(getLSSearchParams(lsName));

    useEffect(() => {
        dispatch(userActions.loadUsers(searchParams.toString())); 
        const skip: string = searchParams.get('skip') || '0';
        const limit: string = searchParams.get('limit') || '30';
        setLSSearchParams(lsName, {skip: skip, limit: limit});
    },[searchParams]);

    return(
        <div className="page_users">
            <MenuComponent/>
            <UsersComponent users={users}/>
            <PaginationComponent arrayCount={users_count} arrayTotal={users_total} lsName={lsName}/>
        </div>
    )
}