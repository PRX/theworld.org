/**
 * @file next.config.js
 * Next.js configuration for this project.
 */

const path = require('path');
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([
  {
    future: {
      webpack5: true
    },
    webpack(config, { isServer }) {
      const newConfig = {
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

      if (!isServer) {
        newConfig.optimization.splitChunks.cacheGroups = {
          ...newConfig.optimization.splitChunks.cacheGroups,
          reactCommon: {
            test: /[\\/]node_modules[\\/]react-(cookies|copy-to-clipboard|html-parser|markdown|moment|player|redux)[\\/]/,
            name: (module, chunks, cacheGroupKey) => {
              const moduleFileName = module
                .identifier()
                .split('/')
                .reduceRight(item => item);
              const allChunksNames = chunks.map(item => item.name).join('~');
              return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
            },
            priority: 20,
            reuseExistingChunk: true,
            enforce: true
          },
          moment: {
            test: /[\\/]node_modules[\\/]moment(-[^\\/]+)?[\\/]/,
            name: 'moment',
            priority: 20,
            reuseExistingChunk: true,
            enforce: true
          },
          materialui: {
            test: /[\\/]node_modules[\\/]@material-ui[\\/]/,
            name: 'material-ui',
            priority: 30,
            reuseExistingChunk: true,
            enforce: true
          },
          pages: {
            test: /[\\/]components[\\/]pages[\\/]/,
            name: (module, chunks, cacheGroupKey) => {
              const moduleFileName = module
                .identifier()
                .split('/')
                .reduceRight(item => item);
              const allChunksNames = chunks.map(item => item.name).join('~');
              return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
            },
            priority: 40,
            reuseExistingChunk: true,
            enforce: true
          }
        };
      }

      return newConfig;
    }
  }
]);
