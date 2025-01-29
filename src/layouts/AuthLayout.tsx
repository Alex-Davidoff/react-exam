import { Outlet } from "react-router"

export const AuthLayout = () => {
    return(
        <div className="layout_auth">
            <Outlet/>
        </div>
    )
}