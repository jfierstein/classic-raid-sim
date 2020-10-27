'use strict';
const path = require('path');

const publicPath = path.join(process.cwd(), 'client/build');
const publicFilePath = (fileName) => path.join(publicPath, fileName);
const emailTemplatesPath = path.join(process.cwd(), 'server/lib/email/templates');
const emailTemplatesFilePath = (fileName) => path.join(emailTemplatesPath, fileName);
const imagesPath = path.join(process.cwd(), 'server/images');
const imagesFilePath = (fileName) => path.join(imagesPath, fileName);
const settingsPath = path.join(process.cwd(), 'server/config');
const settingsFilePath = (fileName) => path.join(settingsPath, fileName);
const configPath = path.join(process.cwd(), 'server/config');

module.exports = {
    configPath,
    publicPath,
    publicFilePath,
    emailTemplatesPath,
    emailTemplatesFilePath,
    settingsPath,
    settingsFilePath,
    imagesPath,
    imagesFilePath
};