import { Outlet } from "react-router"

export const MainLayout = () => {
    return(
        <div className="layout_main">
            <Outlet/>
        </div>
    )
}