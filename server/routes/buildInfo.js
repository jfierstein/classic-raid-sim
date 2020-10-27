const express = require('express');
const router = express.Router();

const config = require('config/env');
const buildInfo = require('buildinfo');

/*
/ Build Info
*/
router.get('/', (req, res) => {
  let info = Object.assign({}, buildInfo);
  info.Environment = config.env;
  //for local development
  if (config.env === 'local') {
    info.AppVersion = '1.000'
    info.BuildTimestamp = new Date().toISOString()
  }
  res.json(info);
});

module.exports = router;