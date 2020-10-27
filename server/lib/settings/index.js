
const utils = require('lib/common/utils')

const getSetting = async (filePath, key) => {
    const settings_json = await utils.readFile(filePath, 'utf8');
    const { settings } = JSON.parse(settings_json);
    return settings[key];
};

const saveSetting = async (filePath, key, value) => {
    const settings_json = await utils.readFile(filePath, { encoding: 'utf8' });
    const { settings } = JSON.parse(settings_json);
    settings[key] = value;
    await utils.writeFile(filePath, JSON.stringify(settings));
}

module.exports = {
    getSetting,
    saveSetting
}