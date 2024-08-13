import { DashboardPage } from "./interactors/DashboardPage/index.jsx";
import { HomePage } from "./interactors/HomePage/index.jsx";
import { SamplePackage } from "./modules/SamplePackage/index.js";
import { UserProfile } from "./modules/UserProfileModule/index.js";
import ReactDOM from 'react-dom/client';

let _APP =  {
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

function _renderRoute(root) {
  let fullPath = window.location.pathname;
  let queryString = window.location.search;
  let hash = window.location.hash;
  let hostname = window.location.hostname;
  let fullURL = window.location.href;
  
  let route = fullPath
  let currentRoute
  const currentInteractor = Object.values(_APP.interactors).find(interactor => interactor.route === fullPath);
  if (currentInteractor) {
      currentRoute = currentInteractor;
  console.log(currentRoute);
  
  }
  
  let interactor = currentRoute?.interactor || false
  if (interactor) {

      const shares = []
      if (currentRoute.share) {
          console.log('currentRoute.share' , typeof currentRoute.share);
          if (typeof currentRoute.share === 'object') {

              (currentRoute.share).forEach(module => {
                  let moduleObject = new module()
                  shares[moduleObject.constructor.name] = moduleObject
              });
          } else if (typeof currentRoute.share === 'function') {
              let moduleName = currentRoute.share
              let moduleObject = new moduleName()
              shares[moduleObject.constructor.name] = moduleObject

          }
      }

      interactor = new interactor(shares || [])
      if (typeof interactor.render === 'function') {
          const response = interactor.render()


          if (root) {
            root.render(response);
          } else {
            console.error("Warning: You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root if you want to update it.");
          }

      } else {
          console.log(`Render For Route Module ${route} Failed`);
      }
      
  } else {
      console.log(`Module For Route ${route} Failed`);
  }
}



let appElement = document.getElementById("app")
let root = ReactDOM.createRoot(appElement);

_renderRoute(root)

function changeUrl(newUrl) {
  window.history.pushState({ path: newUrl }, '', newUrl);
}
function preventLinksEvent() {
  document.addEventListener('click', function (event) {
    const targetElement = event.target;

    if (targetElement.tagName === 'A') {
      changeUrl(targetElement.href);
    _renderRoute(root);
    event.preventDefault();

    }
  });
}
preventLinksEvent();
