'use strict';

require('app-module-path').addPath(__dirname);

const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet')
const express = require('express');
const path = require('path');
const config = require('config/env');
const sse = require('lib/express/sse');
const errorHandler = require('lib/express/errorHandler');
const paths = require('lib/express/paths');
const logger = require('lib/logger');

const app = express();
const port = config.port;

app.set('view engine', 'ejs');
app.set('trust proxy');
logger.info("App starting...");
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '5MB' }));
app.use(cors());
app.use(errorHandler);
app.use(sse.setup);
app.use('/api/buildinfo', require('routes/buildInfo'));
app.use('/api/events', require('routes/events'));
app.use('/api/wcl', require('routes/wcl'));
app.use('/', express.static(paths.publicPath));
app.get('/*', (req, res) => {
    res.sendFile(path.join(paths.publicPath, 'index.html'))
});

app.listen(port);
logger.info(`App running on port ${port}`);