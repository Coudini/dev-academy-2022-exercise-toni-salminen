require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const connection = require('./database/crud.js');
const router = express.Router();
const path = require('path');

router.use(
    express.json(),
    cors(),
    express.static('build')
)

router.get('*', function (req, res) {
    res.sendFile(path.resolve('./build.index.html'))
})

module.exports = router;