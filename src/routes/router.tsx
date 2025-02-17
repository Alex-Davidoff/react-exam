import { Navigate, createBrowserRouter } from "react-router";
import { MainLayout } from "../layouts/MainLayout";
import { MainPage } from "../pages/MainPage";
import { LoginPage } from "../pages/LoginPage";
import { UsersPage } from "../pages/UsersPage";
import { RecipesPage } from "../pages/RecipesPage";
import { UserPage } from "../pages/UserPage";
import { RecipePage } from "../pages/RecipePage";
import { AuthLayout } from "../layouts/AuthLayout";

export const routes = createBrowserRouter([
    {path: '/', element: <MainLayout/>, children: [
        {index:true, element: <Navigate to='main' replace />},
        {path: 'main', element: <MainPage/>},
        {path: 'login', element: <LoginPage/>},
        {path: 'auth', element: <AuthLayout/>, children: [
            {path: 'users', element: <UsersPage/>},
            {path: 'users/:id', element: <UserPage/>},
            {path: 'recipes', element: <RecipesPage/>},
            {path: 'recipes/:id', element: <RecipePage/>}
        ]}
    ]}
]);