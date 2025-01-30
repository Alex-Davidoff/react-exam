import { Link } from "react-router";
import { ILoginResponse } from "../../models/IApiReqRes";

const MenuComponent = () => {
    const authUser: ILoginResponse | null = null;


    if (authUser) {
        return(
        <div className="component_menu">
            <p>Auth user props</p>
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
