const express = require('express');
const app = express();
const cors = require('cors');

//const server = require('./server.js');
const database = require('./database/crud.js');

app.use(cors());
//app.use(server);

const port = process.env.PORT || 8000;

const apiRouter = require('./routes/farmData.js');

const getConnection = app.listen(port, async () => {
    try {
        await database.connect();
        console.log('Connected');

        console.log(`Listening to port ${getConnection.address().port}`);
        
        app.use('/farmdata', apiRouter);
        //const x = await database.getAll('farmdata');
        //console.log(x);
    } catch (err) {
        console.log(err)
        getConnection.close();
    }
})

module.exports = app;