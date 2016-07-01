'use strict';

/**
 * Environment variables and application configuration.
 */

var path = require('path'),
    _ = require('lodash');

var baseConfig = {
  app: {
    root: path.normalize(__dirname + '/../..'),
    env: process.env.NODE_ENV,
    secret: 'secret key' /* used in signing the jwt tokens */,
    pass: 'pass' /* generic password for seed user logins */
  }
};

// environment specific config overrides
var platformConfig = {
  app: {
    port: 3000,
    cacheTime: 7 * 24 * 60 * 60 * 1000 /* default caching time (7 days) for static files, calculated in milliseconds */
  },
  mongo: {
    url: 'mongodb://192.168.1.100:27017/koan-dev'
  },
  oauth: {
    facebook: {
      clientId: '231235687068678',
      clientSecret: '4a90381c6bfa738bb18fb7d6046c14b8',
      callbackUrl: 'https://koan.herokuapp.com/login/facebook/callback'
    },
    google: {
      clientId: '147832090796-ckhu1ehvsc8vv9nso7iefvu5fi7jrsou.apps.googleusercontent.com',
      clientSecret: 'MGOwKgcLPEfCsLjcJJSPeFYu',
      callbackUrl: 'https://koan.herokuapp.com/login/google/callback'
    }
  }
};

// override the base configuration with the platform specific values
module.exports = _.merge(baseConfig, platformConfig);
