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
    getAll: (table) => {
        return new Promise((resolve, reject) => {
            if (connection) {
                let queryLine = `SELECT * FROM ${mysql.escapeId(table)}`;
                connection.query(queryLine, (err, result) => {
                    err ? reject(err) : resolve(result);
                });
            }
            else {
                reject(new Error("Connection failed."));
            }
        });
    },
    search: () => {
        return new Promise((resolve, reject) => {});
    }
};

module.exports = connectionFunctions;