const fs = require('fs');

module.exports =  function (filePath, content) {

    try {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('File written successfully');
    } catch (error) {
        console.error('Error writing file:', error);
    }
}