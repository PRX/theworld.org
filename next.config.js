/**
 * @file next.config.js
 * Next.js configuration for this project.
 */

const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withFonts = require('next-fonts');
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([
  [withSass, {
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: true,
      camelCase: true,
      localIdentName: '[local]___[hash:base64:5]'
    },
    plugins: {}
  }],
  [withCss],
  [withFonts, {
    enableSvg: true
  }],
  {
    webpack: config => {
      // Fixes npm packages that depend on `fs` module
      const node = {
        ...(config.node || {}),
        fs: 'empty'
      }

      return {
        ...config,
        node
      }
    }
  }
]);
