import { DashboardPage } from "./interactors/DashboardPage/index.jsx";
import { HomePage } from "./interactors/HomePage/index.jsx";
import { SamplePackage } from "./modules/SamplePackage/index.js";
import { UserProfile } from "./modules/UserProfileModule/index.js";

export const _APP =  {
    interactors: {
        home : {
            route: '/',
            interactor: HomePage,
            share: SamplePackage

        }, 
        dashboard : {
            route: '/dashboard',
            interactor: DashboardPage,
            share: [UserProfile , SamplePackage]
        }
    },
    config: {
        _APP_NAME: "Discover Flow"
    },
};
