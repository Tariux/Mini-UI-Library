import { _APP } from './app';
import { router } from './core/router/BaseRouter';

class MiniUI {
    constructor() {
        this.init()
        this.events()

    }
  init() {
    router.autoRoute();

  }
  events() {
    function changeUrl(newUrl) {
      window.history.pushState({ path: newUrl }, '', newUrl);
    }
    function preventLinksEvent() {
      document.addEventListener('click', function (event) {
        const targetElement = event.target;

        if (targetElement.href && targetElement.href !== '') {
          changeUrl(targetElement.href);
          router.autoRoute();
          event.preventDefault();
        }
      });
    }
    preventLinksEvent()
  }
}


new MiniUI()