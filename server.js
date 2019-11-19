// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel
const express = require('express');
const { fetchPriApi } = require('pri-api-library');
const { parse } = require('url');
const next = require('next');

const { priApi: priApiConfig } = require('./config');

const { resolveResourceTypeRoute } = require('./routes');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const nextAppHandler = app.getRequestHandler();

const port = 3000;

/**
 * Send unknown route paths to query alias API endpoint to get resource type.
 *
 * Most requests to this app will be from path alias to content that have no set
 * pattern that can be used for clean URL's for app routing as most URL patterns
 * already established do not include content type information.
 *
 * @param {object} req - Fetch Request object.
 * @param {object} res - Fetch Respinse object.
 * @param {func} nextRoute - Express `next()`` callback.
 *
 * @return {mixed} - Results from `app.render` or express `next()` callback.
 *                   Probably inconsequential as either ultimately result in a
 *                   rendered response from express.
 */
const aliasHandler = async (req, res, nextRoute) => {
  // Be sure to pass `true` as the second argument to `url.parse`.
  // This tells it to parse the query portion of the URL.
  const parsedUrl = parse(req.url, true);
  const { pathname, query } = parsedUrl;
  const alias = pathname.substring(1);

  try {
    const data = await fetchPriApi(
      `query/alias/${alias}`,
      { fields: ['id'] },
      null,
      priApiConfig
    );

    // Check for route to handle resource type.
    if (!data.status) {
      const route = resolveResourceTypeRoute(data);

      // Render route page, pass id as query prop.
      return app.render(
        req,
        res,
        route,
        query
      );
    }
  }
  catch (err) {
    console.log(err);
  }

  // Move on to next route handler.
  return nextRoute();
};

app.prepare().then(() => {
  const server = express();

  // Tell server where to resolve static file requests.
  server.use(express.static('static'));
  server.get('/static/*', nextAppHandler);

  // Handle Next app requests.
  server.get('/_next/*', nextAppHandler);

  // Handle home page requests.
  server.get('/', nextAppHandler);

  // Pass all other requests to the alias handler, falling back to Next app
  // handler for non-aliased page requests.
  server.get('*', aliasHandler, nextAppHandler);

  // Listen on the predefined port.
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line
  });
});
