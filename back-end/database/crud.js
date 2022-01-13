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
    // column: farmame
    getDistinct: (table, column) => {
        return new Promise((resolve, reject) => {
            if (connection) {
                let queryLine = `SELECT DISTINCT ${column} FROM ${mysql.escapeId(table)}`;
                connection.query(queryLine, (err,result) => {
                    err ? reject(err) : resolve(result);
                })
            }
            else {
                reject(new Error("Connection failed."));
            }
        })
    },
    search: (table,column, argument) => {
        return new Promise((resolve, reject) => {
            if (connection) {
                let queryLine = `SELECT * FROM ${mysql.escapeId(table)} WHERE ${column} = '${argument}'`;
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
                let queryLine =  `DELETE * FROM ${table}`;
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
    init: (table, data) => {
        return new Promise((resolve, reject) => {
            if (connection) {
                //await this.deleteAll(table);
                //data.forEach
            }
            else {reject(new Error("Connection failed."))}
        })
    }
};
async function test(){
    await connectionFunctions.connect()
    console.log(connection);
    x = await connectionFunctions.getAll("farmdata");
    console.log(x);
    //connectionFunctions.close();
}
//test();
module.exports = connectionFunctions;