const fs = require('fs')
// const readline = require('readline');

const readFile = (filename) => {
    return fs.readFileSync(filename).toString().split(/\n/)
}

module.exports = readFile
