import { Link } from "react-router";
import { IUser } from "../../models/IUser";

interface IUsersProps {
    users: IUser[]
}

const UsersComponent = ({users}: IUsersProps) => {
    return(
        <div className="component">
            <ul>
            {users.map((user) => (
                    <li key={user.id}><Link to={`/auth/users/${user.id}`}>{user.firstName} {user.lastName} ({user.username})</Link></li>
            ))}
            </ul>
        </div>
    )
};

export default UsersComponent;
