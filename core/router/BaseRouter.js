import { _APP } from "../../app";

class BaseRouter {
    constructor() {
        this.routes = {};
        this.currentRoute = null;

        this._detectRoute()
    }

    _detectRoute() {
        this.fullPath = window.location.pathname;
        this.queryString = window.location.search;
        this.hash = window.location.hash;
        this.hostname = window.location.hostname;
        this.fullURL = window.location.href;
        this.appElement = document.getElementById("app")
        const currentInteractor = Object.values(_APP.interactors).find(interactor => interactor.route === this.fullPath);
        if (currentInteractor) {
            this.currentRoute = currentInteractor;
        }
    }

    add(routeID, route) {
        this.routes[routeID] = route;
    }

    route(routeID) {
        this._detectRoute()
        if (this.routes[routeID]) {
            this.currentRoute = this.routes[routeID];
            this._renderRoute(this.currentRoute);
        } else {
            console.warn(`Route with ID ${routeID} does not exist.`);
        }
    }

    autoRoute() {
        this._detectRoute()
        this._renderRoute(this.fullPath)
    }

    _renderRoute(route) {
        console.log(`Navigating to route: ${route}`);
        console.log(`fullPath to route: ${this.fullPath}`);
        console.log(`queryString to route: ${this.queryString}`);
        console.log(`hash to route: ${this.hash}`);
        console.log(`hostname to route: ${this.hostname}`);
        console.log(`fullURL to route: ${this.fullURL}`);
        console.log(`currentRoute to route: ${this.currentRoute}`);
        if (this.currentRoute && this.currentRoute.module && typeof this.currentRoute.module === 'object') {
            if (typeof this.currentRoute.module.render === 'function') {
                this.appElement.innerHTML = this.currentRoute.module.render() || "";

            } else {
                console.log(`Render For Route Module ${route} Failed`);
            }
            
        } else {
            console.log(`Module For Route ${route} Failed`);
        }
    }

    getCurrentRoute() {
        return this.currentRoute;
    }

    listRoutes() {
        return Object.keys(this.routes);
    }

}

// Export the router instance using ES6 syntax
export const router = new BaseRouter();
