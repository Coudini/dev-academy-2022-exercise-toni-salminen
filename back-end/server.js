require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const connection = require('./database/crud.js');
const router = express.Router();
const path = require('path');

//router.use('*', express.static('build'))
router.use(
    express.json(),
    cors(),
    express.urlencoded({ extended: true }),
  express.static('build'),
  (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
  }
)

router.get('*', function (req, res) {
    res.sendFile(path.resolve('../front-end/build/index.html'))
})

router.get('/api/farmdata/'), async (req, res) => {
    try {
        //await connection.connect();
        const results = await connection.getAll('farmdata');
        res.status(200).send(results);
    }
    catch (error) {
        res.status(404).send(error);
    }
}

module.exports = router;