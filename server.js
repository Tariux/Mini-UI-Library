// import { _APP } from './app';
// import { router } from './core/router/BaseRouter';
const http = require('http');
const fs = require('fs');

// class MiniUI {
//   constructor() {
//     this.init();
//     this.events();
//   }
//   init() {
//     router.autoRoute();
//   }
//   events() {
//     function changeUrl(newUrl) {
//       window.history.pushState({ path: newUrl }, '', newUrl);
//     }
//     function preventLinksEvent() {
//       document.addEventListener('click', function (event) {
//         const targetElement = event.target;

//         if (targetElement.href && targetElement.href !== '') {
//           changeUrl(targetElement.href);
//           router.autoRoute();
//           event.preventDefault();
//         }
//       });
//     }
//     preventLinksEvent();
//   }
// }

class MiniUIHttp {
  constructor() {
    this.mimeTypes = {
      html: 'text/html',
      jpeg: 'image/jpeg',
      jpg: 'image/jpeg',
      png: 'image/png',
      js: 'text/javascript',
      css: 'text/css',
    };
    this.PORT = 8080;
  }
  initServer() {


    this.server = http.createServer((req, res) => {
      this.lastRequest = req;
      this.lastResponse = res;
      console.log('req.url', req.url);
      var filesDependencies = req.url.match(/\.js|\.css/);
      console.log('filesDependencies', filesDependencies);
      if (filesDependencies) {
        var extension = this.mimeTypes[filesDependencies[0].toString().split('.')[1]];
        res.writeHead(200, { 'Content-Type': extension });
        fs.createReadStream(__dirname + '/' + req.url).pipe(res);
      } else if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.readFile('./index.html', 'utf8', (err, data) => {
          if (err) {
            res.writeHead(404);
            res.end('File not found!');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
          }
        });
      }
    });
    this.server.listen(this.PORT);
  }
}

new MiniUIHttp().initServer();
