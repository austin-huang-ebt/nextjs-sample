const R = require('ramda');

const compression = require('compression');
const express = require('express');
const { parse } = require('url');
const { join } = require('path');
const cors = require('cors');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

console.info('Environment variables received:');
console.info(JSON.stringify(
  R.pickBy((varValue, varName) => varName.startsWith('UISVR'), process.env),
  null, 2
));

app.prepare()
  .then(() => {
    const server = express();
    server.use(cors());
    server.use(compression());

    server.get('*', (req, res) => {
      const parsedUrl = parse(req.url, true);
      // https://github.com/zeit/next.js/tree/canary/examples/root-static-files
      const rootStaticFiles = [
        // '/robots.txt',
        // '/sitemap.xml',
        '/favicon.ico',
        '/company_logo.svg',
      ];
      if (rootStaticFiles.indexOf(parsedUrl.pathname) > -1) {
        const path = join(__dirname, 'static', parsedUrl.pathname);
        app.serveStatic(req, res, path);
      } else {
        handle(req, res, parsedUrl);
      }
    });

    const port = process.env.UISVR_PORT || 3000;

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://0.0.0.0:${ port }`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
