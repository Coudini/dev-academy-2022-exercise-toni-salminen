require('dotenv').config();
const mysql = require('mysql');
const config = require("./config.js");

let connection = null;

const connectionFunctions = {
    connect: () => {
        return new Promise((resolve, reject) => {
            console.log(config)
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
                let queryLine = `SELECT * FROM ${mysql.escapeId(table)} ORDER BY farmname ASC, datevalue DESC`;
                connection.query(queryLine, (err, result) => {
                    err ? reject(err) : resolve(result);
                });
            }
            else {
                reject(new Error("Connection failed."));
            }
        });
    },

    // Used for listing all farm names
    getDistinct: (table, column) => {
        return new Promise((resolve, reject) => {
            if (connection) {
                let queryLine = `SELECT DISTINCT ${column} FROM ${mysql.escapeId(table)} ORDER BY ${column} ASC`;
                connection.query(queryLine, (err,result) => {
                    err ? reject(err) : resolve(result);
                })
            }
            else {
                reject(new Error("Connection failed."));
            }
        })
    },

    // Used for listing by farm name ordered by dates
    search: (table,column, argument) => {
        return new Promise((resolve, reject) => {
            console.log(table,column,argument)
            if (connection) {
                let queryLine = `SELECT * FROM ${mysql.escapeId(table)} WHERE ${column} = '${argument}'ORDER BY datevalue ASC`;
                console.log("queryLine:",queryLine);
                connection.query(queryLine, (err, result) => {
                    err ? reject(err) : resolve(result);
                })
            }
            else{
                reject(new Error("Connection failed."));
            }
        });
    },

    saveData: (table, data) => {
        return new Promise((resolve, reject) => {
            if (connection) {
                let queryLine = `INSERT INTO ${table} (farmname, datevalue, metrictype, metricvalue)
                                VALUES (${data.name},
                                        ${data.date},
                                        ${data.type},
                                        ${data.value})`;
                connection.query(queryLine, (err, result) => {
                    err ? reject(err) : resolve(result);
                })
            }
            else {reject(new Error("Connection failed."))}
        })
    },

    deleteAll: (table) => {
        return new Promise((resolve, reject) => {
            if (connection) {
                let queryLine =  `DELETE FROM ${table}`;
                connection.query(queryLine, (err, result) => {
                    err ? reject(err) : resolve(result);
                })
            }
            else {reject(new Error("Connection failed."))}
        })
    },

    deleteById: (table, id) => {
        return new Promise((resolve, reject) => {
            if (connection) {
                let queryLine = `DELETE FROM ${table} WHERE id = ${id}`;
                connection.query(queryLine, (err, result) => {
                    err ? reject(err) : resolve(result);
                })
            }
            else {reject(new Error("Connection failed."))}
        })
    },
    insert: (table, columns, data) => {
        return new Promise((resolve, reject) => {
            if (connection) {
                let queryLine = `INSERT INTO ${table} (${columns[0]},${columns[1]},${columns[2]},${columns[3]}) VALUES ('${data[0]}','${data[1]}','${data[2]}',${data[3]});`;
                connection.query(queryLine, (err, result) => {
                    err ? reject(err) : resolve(result);
                })
            }
            else {reject(new Error("Connection failed."))}
        })
    }
};

module.exports = connectionFunctions;