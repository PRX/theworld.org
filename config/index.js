/**
 * @file index.js
 * Exports default config, overridden by local config.
 */

let defaultConfig = require('./development.json');

const { NODE_ENV } = process.env;

// If this is a production environment, override with production settings.
if (NODE_ENV === 'production') {
  defaultConfig = require('./production.json'); // eslint-disable-line global-require
}

// If local config exists, allow overrides.
let localConfig;
try {
  localConfig = require('./local.json'); // eslint-disable-line global-require, import/no-unresolved, max-len
} catch (e) {
  localConfig = {};
}

// Provide API URL override if provided as environment variable.
const { PRI_API_DOMAIN } = process.env;
let envConfig = {};
if (PRI_API_DOMAIN) {
  envConfig = {
    domain: PRI_API_DOMAIN
  };
}

module.exports = { ...defaultConfig, ...localConfig, ...envConfig };
