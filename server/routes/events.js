const express = require('express');
const router = express.Router();

const eventStream = require('lib/events');
const sse = require('lib/express/sse');

router.get('/stream', (req, res) => {
  res.sseSetup();
  sse.startPing(res);
  eventStream.on(`stream`, (data) => res.sseData(data));
});

module.exports = router;
