'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const database = require('./database/crud.js');

app.use(cors());

const port = process.env.PORT || 8000;

const apiRouter = require('./server.js');
app.use(apiRouter);


//app.use(apiRouter);

// initialize database with provided csv-files
// NOTE: if csv-files contain loads of data, it may take some time to push everytthing into the sql-database
async function initDbCsv(){

    // Empty the sql-database
    await database.deleteAll('farmdata');

    // parse csv into array and validate for saving into database
    const parser = require('./util/parsing')
    const data = await parser.parseDirectory('./csv-files/');

    // Push values into database
    for (let i = 0; i < data.length; i++){

        // Modify variables to make them sql friendly
        let sqlDate = require('moment')(data[i].date).format('YYYY-MM-DD HH:mm:ss');
        let sqlName = (data[i].name).replace(/'/g, "''");
        await database.insert('farmdata',['farmname', 'datevalue', 'metrictype', 'metricvalue'],[sqlName, sqlDate, data[i].type, data[i].value]);
    }
}

// Opens and maintains a connection
const getConnection = app.listen(port, async () => {
    try {
        
        await database.connect();
        console.log('Connected');

        console.log(`Listening to port ${getConnection.address().port}`);
        
        //app.use('/api', apiRouter);

        // Function for database-initiation with the provided csv-files
        //initDbCsv();

    } catch (err) {
        console.log(err)
        getConnection.close();
    }
})

module.exports = app;