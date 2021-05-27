/**
 * @file next.config.js
 * Next.js configuration for this project.
 */

const path = require('path');
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([
  {
    webpack(config) {
      return {
        ...config,
        resolve: {
          ...config.resolve,
          alias: {
            ...config.resolve.alias,
            '@components': path.join(__dirname, 'components'),
            '@config': path.join(__dirname, 'config'),
            '@contexts': path.join(__dirname, 'contexts'),
            '@interfaces': path.join(__dirname, 'interfaces'),
            '@lib': path.join(__dirname, 'lib'),
            '@store': path.join(__dirname, 'store'),
            '@svg': path.join(__dirname, 'assets', 'svg'),
            '@theme': path.join(__dirname, 'theme')
          }
        }
      };
    }
  }
]);
