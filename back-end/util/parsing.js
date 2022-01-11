const fs = require("fs");
const model = require("../model/FarmData.js");
const validator = require("./validation.js")
const path = "../csv-files/"

function readDirAsync (directory) {
    return new Promise(function (resolve, reject) {
        fs.readdir(directory, function(err, files) {
            if (err) {
                reject(err);
            }
            resolve(files);
        })
    })
}

function readFileAsync (file) {
    return new Promise(function (resolve, reject) {
        fs.readFile(file, 'utf8', function(err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        })
    })
}

async function filesToArray (directory, files) {
    let csvData = {}
    for (let i = 0; i < files.length; i++) {
        let data = await readFileAsync(`${directory}${files[i]}`);
        const headers = data.slice(0, data.indexOf("\n")).split(",");
        const rows = data.slice(data.indexOf("\n") + 1).split("\n");
        let farmData = []
        for (let j = 0; j < rows.length; j++) {
            const values = rows[j].split(",");
            if (values.length == headers.length) {
                let dataModel = new model({
                    name: values[0],
                    date: new Date(values[1]),
                    type: values[2],
                    value: parseFloat(values[3])
                });
                if (validator.dataValidation(dataModel).errors.length == 0){
                    farmData.push(dataModel);
                }
            }
        }
        csvData[files[i]] = farmData;
    }
    return csvData;
}

async function getDirectoryData (path) {
    const files = await readDirAsync(path);
    const content = await filesToArray(path, files);
    return content;
}

const parsing = {
    parseCsv: (file) => {
        return new Promise((resolve) => {
            resolve(readFileAsync(file));
        });
    },
    parseDirectory: (directory) => {
        return new Promise((resolve) => {
            resolve(getDirectoryData(directory));
        });
    }
}

module.exports = parsing;
