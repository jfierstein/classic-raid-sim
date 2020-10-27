const setup = (req, res, next) => {
  res.sseSetup = () => {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no'
    })
  }
  res.sseData = (data) => {
    res.write(`data:  ${JSON.stringify(data)} \n\n`);
  }
  next();
}

const sendData = (res, data) => {
  if (data) {
    res.sseData(data);
    res.flushHeaders();
  }
}

const startPing = (res) => {
  res.sseData({ type: 'ping' });
  setInterval(() => {
    res.sseData({ type: 'ping' });
    res.flushHeaders();
  }, 30000);
}

module.exports = {
  setup,
  sendData,
  startPing
}