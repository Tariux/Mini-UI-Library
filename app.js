import { DashboardPage } from "./interactors/DashboardPage/index.jsx";
import { HomePage } from "./interactors/HomePage/index.jsx";

export const _APP =  {
    interactors: {
        home : {
            route: '/',
            module: HomePage
        }, 
        dashboard : {
            route: '/dashboard',
            module: DashboardPage
        }
    },
    config: {
        _APP_NAME: "Discover Flow"
    },
};
