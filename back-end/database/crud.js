const mysql = require('mysql');
const config = require("./config.js");

let connection = null;

const connectionFunctions = {
    connect: () => {
        return new Promise((resolve, reject) => {
            connection = mysql.createConnection(config);
            connection
                ? resolve("Connected!")
                : reject(new Error("Connection failed."));
        });
    },
    close: () => {
        return new Promise((resolve) => {
            connection.end();
            resolve("Connection closed.");
        });
    },
    getAll: () => {
        return new Promise((resolve, reject) => {});
    },
    search: () => {
        return new Promise((resolve, reject) => {});
    }
};

module.exports = connectionFunctions;