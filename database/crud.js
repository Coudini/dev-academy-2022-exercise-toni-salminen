const mysql = require('mysql');
const config = require("./config.js");

let connection = null;

// Promise based connection functions for sql-requests
const connectionFunctions = {

    // Open Connection to sql-database
    connect: () => {
        console.log(config);
        return new Promise((resolve, reject) => {
            connection = mysql.createConnection(config);
            connection
                ? resolve("Connected!")
                : reject(new Error("Connection failed."));
        });
    },

    // Close connection from sql-database
    close: () => {
        return new Promise((resolve) => {
            connection.end();
            resolve("Connection closed.");
        });
    },

    // Get everything from sql-database, ordered by name and date
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

    // Get distinct names from sql-database
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

    // Get data with provided argument matching farm names from sql-database
    searchFarm: (table,column, argument) => {
        return new Promise((resolve, reject) => {
            if (connection) {
                let queryLine = `SELECT * FROM ${mysql.escapeId(table)} WHERE ${column} = '${argument}' ORDER BY datevalue ASC`;
                connection.query(queryLine, (err, result) => {
                    err ? reject(err) : resolve(result);
                })
            }
            else{
                reject(new Error("Connection failed."));
            }
        });
    },

    // Get data with provided argument matching type of metric from sql-database
    searchMetric: (table,column, argument) => {
        return new Promise((resolve, reject) => {
            if (connection) {
                let queryLine = `SELECT * FROM ${mysql.escapeId(table)} WHERE ${column} = '${argument}' ORDER BY datevalue ASC`;
                connection.query(queryLine, (err, result) => {
                    err ? reject(err) : resolve(result);
                })
            }
            else{
                reject(new Error("Connection failed."));
            }
        });
    },
    
    // Get data with provided arguments matching type of metric and farm name from sql-database
    searchFarmMetric: (table,farmColumn,metricColumn,metricArgument,farmArgument) => {
        return new Promise((resolve, reject) => {
            if (connection) {
                let queryLine = `SELECT * FROM ${mysql.escapeId(table)} WHERE ${farmColumn} = '${farmArgument}' AND ${metricColumn} = '${metricArgument}'`;
                connection.query(queryLine, (err, result) => {
                    err ? reject(err) : resolve(result);
                })
            }

        });
    },

    // Save data into sql-database
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

    // Empty sql-database
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

    // Delete a row from sql-database matching the provided 'id'-argument
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

    // Insert a row into sql-database
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