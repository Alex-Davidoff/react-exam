import { useParams } from "react-router";
import { UserComponent } from "../components/UsersComponents/UserComponent";
import { useMainSelector } from "../redux/store";

export const UserPage = () => {
    const {id} = useParams();

    const users = useMainSelector((state) => state.userStoreSlice.users);

    if (users){
    return(
        <div>
            {users.filter((user) => (user.id===Number(id)))
            .map((user) => <UserComponent key={user.id} user={user}/>)}  
        </div>
    )}
}