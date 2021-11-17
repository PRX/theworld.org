/**
 * @file next.config.js
 * Next.js configuration for this project.
 */

const path = require('path');
const { withPlausibleProxy } = require('next-plausible');
const { uid } = require('uid');
const { priApi } = require('./config');

module.exports = withPlausibleProxy({
  subdirectory: uid(6),
  scriptName: uid()
})({
  env: {
    CM_API_KEY: process.env.CM_API_KEY,
    CSE_API_KEY: process.env.CSE_API_KEY,
    FB_ACCESS_TOKEN: process.env.FB_ACCESS_TOKEN,
    PRI_API_CONFIG: priApi,
    ISR_REVALIDATE: process.env.ISR_REVALIDATE
  },
  images: {
    domains: [
      'media.pri.org',
      'www.pri.org',
      'pri9.lndo.site',
      'media-pri-dev.s3.us-east-1.amazonaws.com',
      'www.loe.org',
      'www.globalpost.com'
    ],
    deviceSizes: [370, 600, 960, 1280, 1920],
    imageSizes: [50, 100, 300, 400, 568, 808]
  },
  future: {
    webpack5: true
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'cache-control',
            value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate'
          },
          {
            key: 'X-TW-FE-CUSTOM-NEXT-CONFIG-ALL',
            value: 'SET IN next.config.js'
          },
          {
            key: 'X-TW-FE-CUSTOM-NEXT-CONFIG-NODE_ENV',
            value: process.env.NODE_ENV
          }
        ]
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'cache-control',
            value: 'public, max-age=3600, s-maxage=3, stale-while-revalidate'
          },
          {
            key: 'X-TW-FE-CUSTOM-NEXT-CONFIG-API',
            value: 'SET IN next.config.js'
          }
        ]
      }
    ];
  },
  async redirects() {
    return [
      {
        source: '/file/:slug',
        destination: '/media/:slug',
        permanent: true
      }
    ];
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
          chunks: 'all',
          test: /(?<!node_modules.*)[\\/]node_modules[\\/]react-(cookies|copy-to-clipboard|html-parser|markdown|moment|player|redux)[\\/]/,
          name: (module, chunks, cacheGroupKey) => {
            const moduleFileName = module
              .identifier()
              .split('/')
              .reduceRight(item => item.toLowerCase());
            const allChunksNames = chunks
              .map(item => (item.name || '').toLowerCase())
              .join('~');
            return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
          },
          priority: 30,
          reuseExistingChunk: true,
          enforce: true
        },
        moment: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]moment(-[^\\/]+)?[\\/]/,
          name: 'moment',
          priority: 30,
          reuseExistingChunk: true,
          enforce: true
        },
        materialui: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]@material-ui[\\/]/,
          name: 'material-ui',
          priority: 30,
          reuseExistingChunk: true,
          enforce: true
        },
        pages: {
          chunks: 'all',
          test: /[\\/]components[\\/]pages[\\/]/,
          name: (module, chunks, cacheGroupKey) => {
            const moduleFileName = module
              .identifier()
              .split('/')
              .reduceRight(item => item.toLowerCase());
            const allChunksNames = chunks
              .map(item => (item.name || '').toLowerCase())
              .join('~');
            return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
          },
          priority: 40,
          reuseExistingChunk: true,
          enforce: true
        },
        audioPlayer: {
          chunks: 'all',
          test: /[\\/]components[\\/]Audio[\\/]/,
          name: 'material-ui',
          priority: 40,
          reuseExistingChunk: true,
          enforce: true
        },
        sidebar: {
          chunks: 'all',
          test: /[\\/]components[\\/]sidebar[\\/]/,
          name: (module, chunks, cacheGroupKey) => {
            const moduleFileName = module
              .identifier()
              .split('/')
              .reduceRight(item => item.toLowerCase());
            const allChunksNames = chunks
              .map(item => (item.name || '').toLowerCase())
              .join('~');
            return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
          },
          priority: 40,
          reuseExistingChunk: true,
          enforce: true
        },
        lib: {
          chunks: 'all',
          test: /[\\/]lib[\\/]/,
          name: (module, chunks, cacheGroupKey) => {
            const moduleFileName = module
              .identifier()
              .split('/')
              .reduceRight(item => item.toLowerCase());
            const allChunksNames = chunks
              .map(item => (item.name || '').toLowerCase())
              .join('~');
            return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
          },
          priority: 40,
          reuseExistingChunk: true,
          enforce: true
        },
        store: {
          chunks: 'all',
          test: /[\\/]store[\\/]/,
          name: (module, chunks, cacheGroupKey) => {
            const moduleFileName = module
              .identifier()
              .split('/')
              .reduceRight(item => item.toLowerCase());
            const allChunksNames = chunks
              .map(item => (item.name || '').toLowerCase())
              .join('~');
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
});
