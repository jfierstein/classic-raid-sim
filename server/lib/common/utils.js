const fs = require('fs');

const readFile = (path, encoding) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, encoding, (error, data) => {            
           if(error) reject(error);
           resolve(data);
        });
    });
}

const writeFile = async (path, data) => {
    await fs.writeFile(path, data);
}

module.exports = {
    readFile,
    writeFile
}