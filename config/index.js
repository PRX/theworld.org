/**
 * @file index.js
 * Exports default config, overridden by local config.
 */

const fs = require('fs');

let defaultConfig = {};
let localConfig = {};
let envConfig = {};

const { NODE_ENV } = process.env;

// If this is a production environment, override with production settings.
if (NODE_ENV === 'production') {
  defaultConfig = require('./production.json'); // eslint-disable-line global-require
}
else {
  defaultConfig = require('./development.json'); // eslint-disable-line global-require

  // If local config exists, allow overrides.
  if (fs.existsSync('./local.json')) {
    localConfig = require('./local.json'); // eslint-disable-line global-require, import/no-unresolved, max-len
  }

  // Provide API URL override if provided as environment variable.
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

module.exports = { ...defaultConfig, ...localConfig, ...envConfig };
