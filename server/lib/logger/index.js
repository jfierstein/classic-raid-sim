'use strict';

const bunyan = require('bunyan');

const config = require('config/env');
const path = require('path');
const appDir = path.dirname(require.main.filename);
const appName = require(`${appDir}/../package.json`).name;

const logger = bunyan.createLogger({name: `${appName}-${config.env}`});

module.exports = logger;