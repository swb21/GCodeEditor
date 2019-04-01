const fs = require('fs');
const path = require('path');

const baseDir = 'public/scripts/';
let files = [];
readFiles(baseDir);

function readFiles(dir) {
    fs.readdirSync(dir).forEach(file => {
        let stat = fs.statSync(path.resolve(dir, file));

        if (stat && stat.isDirectory()) {
            readFiles(path.join(dir, file));
        } else {
            files.push('./' + path.join(dir, file));
        }
    });
}

module.exports = {
    entry: files,
    output: {
        path: path.resolve('./public'),
        filename: 'bundle.js'
    }
};