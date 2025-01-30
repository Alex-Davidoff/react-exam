import { Link } from "react-router";
import { getLSUser } from "../../services/local.storage";

const MenuComponent = () => {
    const authUser = getLSUser();

    if (authUser) {
        return(
        <div className="component_menu">
            <ul>
                <li><Link to={'/auth/users'}>Users</Link></li>
                <li><Link to={'/auth/recipes'}>Recipes</Link></li>
            </ul>
            <div>
                <p>{authUser.firstName} {authUser.lastName}</p>
                <img src={authUser.image} alt={`${authUser.firstName} ${authUser.lastName}`} />
            </div>
            
        </div>
        )
    } else {
        return(
            <div className="component_menu">
                <p>user not authorized</p>
                <span><Link to={'/login'}>log in</Link></span>
            </div>
            )        
    }
};

export default MenuComponent;
