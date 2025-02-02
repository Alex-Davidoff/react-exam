import { Outlet } from "react-router"
import MenuComponent from "../components/MenuComponent/MenuComponent"

export const AuthLayout = () => {
    return(
        <div className="layout_auth">
            <MenuComponent/>
            <Outlet/>
        </div>
    )
}