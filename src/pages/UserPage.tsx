import { useParams, useSearchParams } from "react-router";
import { UserComponent } from "../components/UsersComponents/UserComponent";
import { useMainDispatch, useMainSelector } from "../redux/store";
import { useEffect } from "react";
import { userActions } from "../redux/slices/userSlice";

export const UserPage = () => {
    const {id} = useParams();

    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useMainDispatch();
    const users = useMainSelector((state) => state.userStoreSlice.users);

    useEffect(() => {
        if (!users) {
            if (id) {
                searchParams.set('q', id);
                setSearchParams(searchParams);
                dispatch(userActions.loadUsers(searchParams));
            } 
        }
    },[searchParams]);
    
    if (users){
    return(
        <div>
            {users.filter((user) => (user.id===Number(id)))
            .map((user) => <UserComponent key={user.id} user={user}/>)}  
        </div>
    )}
}