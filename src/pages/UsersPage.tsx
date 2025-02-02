import { useEffect } from "react";
import UsersComponent from "../components/UsersComponents/UsersComponent"
import { useMainDispatch, useMainSelector } from "../redux/store";
import { userActions } from "../redux/slices/userSlice";
import { useSearchParams } from "react-router";
import { PaginationComponent } from "../components/PaginationComponent/PaginationComponent";
import SearchComponent from "../components/SearchComponent/SearchComponent";

export const UsersPage = () => {
    const dispatch = useMainDispatch();
    const users = useMainSelector((state) => state.userStoreSlice.users);
    const users_total = useMainSelector((state) => state.userStoreSlice.total);
    
    let users_count = 0;
    if (users) {users_count = users.length};
    const lsName = 'Users';
    
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        dispatch(userActions.loadUsers(searchParams)); 
    },[searchParams]);

    return(
        <div key="users" className="page_users">
            <SearchComponent searchBy={lsName}/>
            <UsersComponent users={users}/>
            <PaginationComponent arrayCount={users_count} arrayTotal={users_total}/>
        </div> 
    )
}