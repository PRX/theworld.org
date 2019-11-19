// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel

/**
 * Map for resource type to route path or resolver function.
 */
const resourceTypeRouteMap = {
  'node--stories': (id) => `/stories/${id}`
};

/**
 * Resolve PRI API to a route path.
 *
 * @param object param0
 *    Denormalized PRI API data object.
 */
const resolveResourceTypeRoute = ({type, id}) => {
  const route = resourceTypeRouteMap[`${type}`];

  return typeof route && (typeof route === 'function' ? route(id) : route);
};

module.exports = { resolveResourceTypeRoute };
