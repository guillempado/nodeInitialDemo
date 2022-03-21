
const fs = require('fs')

let _data
let _filepath

function connect(filepath) {
    if(filepath === undefined)
        throw Error('Filepath de JsonDB no especificat')
    _filepath = filepath
    try {
        _data = JSON.parse(fs.readFileSync(_filepath).toString());
    } catch(e){
        // Error en parsing, desa nou file buit
        _data = []
        saveData()
    }
}

function saveData() {
    const json = JSON.stringify(_data, null, 4);
    fs.writeFileSync(_filepath, json, 'utf8')
}

function addFileData(obj){
    _data.push(obj)
    saveData()
}

module.exports = {connect, addFileData}