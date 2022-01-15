const fs = require("fs");
const model = require("../model/FarmData.js");
const validator = require("./validation.js")
const path = "../csv-files/"

//Async function for listing all files in a directory. Returns a Promise object
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

// Async function for reading a csv-file. Returns a Promise object
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

// Function to get an array of Datastructures from csv-files
async function filesToArray (directory, files) {
    let csvData = [];
    for (let i = 0; i < files.length; i++) {
        let data = await readFileAsync(`${directory}${files[i]}`);
        const headers = data.slice(0, data.indexOf("\n")).split(",");
        const rows = data.slice(data.indexOf("\n") + 1).split("\n");
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
                    csvData.push(dataModel);
                }
            }
        }
    }
    return csvData;
}

// Function to get parsed csv-data from all csv-files in a directory
async function getDirectoryData (path) {
    const files = await readDirAsync(path);
    const content = await filesToArray(path, files);
    return content;
}

// Exported functions for parsing a whole directory or a single csv-file/s
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
