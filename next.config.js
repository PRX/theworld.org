/**
 * @file next.config.js
 * Next.js configuration for this project.
 */

const path = require('path');
const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withFonts = require('next-fonts');
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([
  [
    withSass,
    {
      cssModules: true,
      cssLoaderOptions: {
        importLoaders: true,
        camelCase: true,
        localIdentName: '[local]___[hash:base64:5]'
      },
      plugins: {}
    }
  ],
  [withCss],
  [
    withFonts,
    {
      enableSvg: true
    }
  ],
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
            '@svg': path.join(__dirname, 'assets', 'svg'),
            '@theme': path.join(__dirname, 'theme')
          }
        }
      };
    }
  }
]);
