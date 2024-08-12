import { useRoutes } from "react-router-dom"
import App from "../App"
import { Catalog } from "../pages/catalog/catalog";
import { Avaliation } from "../pages/avaliation/Avaliation";

export const MainRouters = () => {
    const routes = useRoutes([
        { path: '/', element: <App /> },
        { path: '/catalog/:type', element: <Catalog /> },
        { path: '/avaliation/:type/:id', element: <Avaliation /> }
    ]);

    return routes;
}