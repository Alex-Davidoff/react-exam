import { Link } from "react-router";
import { useMainDispatch, useMainSelector } from "../../redux/store";

const MenuComponent = () => {
    const dispatch = useMainDispatch();
    const authUser = useMainSelector((state) => state.currentUserStoreSlice.c_user);

    if (authUser.id) {
        return(
        <div className="component_menu">
            <p>{authUser.id} {authUser.firstName} {authUser.lastName}</p>
        </div>
        )
    } else {
        return(
            <div className="component_menu">
                <p>user not authorized <Link to={'/login'}>log in</Link></p>
            </div>
            )        
    }
};

export default MenuComponent;
