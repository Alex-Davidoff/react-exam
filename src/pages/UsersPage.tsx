import { useEffect } from "react";
import MenuComponent from "../components/MenuComponent/MenuComponent"
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
    const users_count = users.length;
    const lsName = 'Users';
    
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        dispatch(userActions.loadUsers(searchParams));         
    },[searchParams]);

    return(
        <div className="page_users">
            <MenuComponent/>
            <SearchComponent searchBy={lsName}/>
            <UsersComponent users={users}/>
            <PaginationComponent arrayCount={users_count} arrayTotal={users_total}/>
        </div>
    )
}