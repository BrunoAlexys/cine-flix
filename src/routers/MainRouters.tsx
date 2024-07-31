import { useRoutes } from "react-router-dom"
import App from "../App"
import { Catalog } from "../components/catalog/catalog";

export const MainRouters = () => {
    const routes = useRoutes([
        { path: '/', element: <App /> },
        { path: '/catalog/:type', element: <Catalog /> },
    ]);

    return routes;
}