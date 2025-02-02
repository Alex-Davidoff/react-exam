import { IUser } from "../../models/IUser"

interface IUserProps {
    user: IUser
}

export const UserComponent = ({user}: IUserProps) => {
    return(
        <div>
            <h2>{user.firstName} {user.lastName}</h2>
            <p>({user.username})</p>
            <img src={user.image} alt={`${user.firstName} ${user.lastName}`} />
            <h2>{user.age} {user.gender} {user.birthDate}</h2>
            <p>{user.phone}</p>
            
        </div>
    )
} 