/**
 * @file index.js
 * Exports default config, overridden by local config.
 */

const productionConfig = require('./production');
const developmentConfig = require('./development');

const { NODE_ENV, AWS_BRANCH } = process.env;
const defaultConfig =
  [NODE_ENV, AWS_BRANCH].indexOf('production') !== -1
    ? productionConfig
    : developmentConfig;

// Try to get local overrides.
// NOTE: Copy ./local.example.js to ./local.js.
// DO NOT ADD PROPS TO local.json. This file acts as a fallback file in env's
// not using local settings.
let localConfig = {};
try {
  localConfig = require('./local'); // eslint-disable-line global-require, import/no-unresolved, max-len
} catch (err) {
  // console.log(err); // eslint-disable-line no-console
}

// Extend default config with local config.
const config = {
  ...defaultConfig,
  ...localConfig,
  analytics: {
    domain: 'theworld.org',
    ...(defaultConfig.analytics || {}),
    ...(localConfig.analytics || {})
  },
  priApi: {
    ...(defaultConfig.priApi || {}),
    ...(localConfig.priApi || {})
  }
};

const {
  priApi,
  priApi: { protocol, domain, apiPath, apiVersion }
} = config;
// Get env domain, fall back to configured domain.
const apiDomain = process.env.PRI_API_DOMAIN || domain;
// Construct base API URL.
const apiUrlBase = `${protocol}://${apiDomain}/${apiPath}/v${apiVersion}`;

module.exports = {
  ...config,
  priApi: {
    ...priApi,
    domain: apiDomain,
    apiUrlBase
  }
};
