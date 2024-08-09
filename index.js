import { _APP } from './app';
// import { loader } from './core/loader/BaseLoader';
import { router } from './core/router/BaseRouter';

// Add routes
router.add('home', '/home');
router.add('about', '/about');
router.add('contact', '/contact');
// loader.loadModules('./interactors/')
router.autoRoute()

document.addEventListener('click', function(event) {

    const targetElement = event.target;

    if (targetElement.href && targetElement.href !== '') {
        changeUrl(targetElement.href);
        router.autoRoute();
        event.preventDefault();
    }

});
function changeUrl(newUrl) {
    window.history.pushState({ path: newUrl }, '', newUrl);
}

// Example: change the URL to /about