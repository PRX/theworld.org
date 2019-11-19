/**
 * @file index.js
 * Exports default config, overridden by local config.
 */

let defaultConfig = {};
let localConfig = {};
let envConfig = {};

const { NODE_ENV } = process.env;

// If this is a production environment, use production settings.
if (NODE_ENV === 'production') {
  defaultConfig = require('./production'); // eslint-disable-line global-require
}
else {
  // Otherwise, use development settings.
  defaultConfig = require('./development'); // eslint-disable-line global-require

  // Try to get local overrides.
  // NOTE: Copy ./local.example.js to ./local.js.
  // DO NOT ADD PROPS TO local.json. This file acts as a fallback file in env's
  // not using local settings.
  try {
    localConfig = require('./local'); // eslint-disable-line global-require, import/no-unresolved, max-len
  }
  catch (err) {
    // console.log(err); // eslint-disable-line no-console
  }

  // Extend default config with local settings.
  defaultConfig = {
    ...defaultConfig,
    ...localConfig,
    analytics: {
      ...(defaultConfig.analytics || {}),
      ...(localConfig.analytics || {})
    },
    priApi: {
      ...(defaultConfig.priApi || {}),
      ...(localConfig.priApi || {})
    }
  };

  // Provide API URL override if provided as environment variable.
  // TODO: Do we need this? Can it be done a bit cleaner?
  const { PRI_API_DOMAIN } = process.env;
  if (PRI_API_DOMAIN) {
    envConfig = {
      priApi: {
        ...(defaultConfig.priApi || {}),
        domain: PRI_API_DOMAIN
      }
    };
  }
}

const config = { ...defaultConfig, ...envConfig };
const {
  priApi,
  priApi: { protocol, domain, apiPath, apiVersion }
} = config;

module.exports = {
  ...config,
  priApi: {
    ...priApi,
    apiUrlBase: `${protocol}://${domain}/${apiPath}/v${apiVersion}`
  }
};
