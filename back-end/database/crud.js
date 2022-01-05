const mysql = require('mysql');

let connection = null;

const connectionFunctions = {
    connect: () => {
        return new Promise((resolve, reject) => {});
    },
    close: () => {
        return new Promise((resolve, reject) => {});
    },
    search: () => {
        return new Promise((resolve, reject) => {});
    }
};

module.exports = connectionFunctions;