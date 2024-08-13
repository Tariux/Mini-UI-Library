const _APP = require("../../app")
const ReactDOM = require('react-dom/client')
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
        console.log(`currentRoute to route: ` , this.currentRoute);

        let interactor = this.currentRoute?.interactor || false
        if (interactor) {

            const shares = []
            if (this.currentRoute.share) {
                console.log('this.currentRoute.share' , typeof this.currentRoute.share);
                if (typeof this.currentRoute.share === 'object') {

                    (this.currentRoute.share).forEach(module => {
                        let moduleObject = new module()
                        shares[moduleObject.constructor.name] = moduleObject
                    });
                } else if (typeof this.currentRoute.share === 'function') {
                    let moduleName = this.currentRoute.share
                    let moduleObject = new moduleName()
                    shares[moduleObject.constructor.name] = moduleObject

                }
            }

            interactor = new interactor(shares || [])
            if (typeof interactor.render === 'function') {
                const response = interactor.render()

                if (!this.root) {
                    this.root = ReactDOM.createRoot(this.appElement);
                }
                this.root.render(response);


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
