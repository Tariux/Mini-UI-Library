import { DashboardPage } from "./interactors/DashboardPage";
import { HomePage } from "./interactors/HomePage";

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
