import { Link } from "react-router";
import { getLSUser } from "../../services/local.storage";

const MenuComponent = () => {
    const authUser = getLSUser();

    if (authUser) {
        return(
        <div className="component_menu mb-1 flex justify-between items-center bg-sky-50">
            <ul className="flex gap-4 pl-4">
                <li className="underline border border-orange-600 rounded-sm px-4"><Link to={'/auth/users'}>Users</Link></li>
                <li className="underline border border-orange-600 rounded-sm px-4"><Link to={'/auth/recipes'}>Recipes</Link></li>
            </ul>
            <div className="flex gap-4 items-center">
                <p className="text-xl italic">{authUser.firstName} {authUser.lastName}</p>
                <img className="size-12" src={authUser.image} alt={`${authUser.firstName} ${authUser.lastName}`} />
            </div>
            
        </div>
        )
    } else {
        return(
            <div className="component_menu flex gap-4">
                <p className="pl-4">user not authorized</p>
                <span className="underline border border-orange-600 rounded-sm px-4"><Link to={'/login'}>log in</Link></span>
            </div>
            )        
    }
};

export default MenuComponent;
