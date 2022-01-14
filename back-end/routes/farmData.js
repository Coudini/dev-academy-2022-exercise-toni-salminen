const express = require('express');
const router = express.Router();
router.use(express.json())

const connection = require('../database/crud');

//get all
router.get('/farmdata', async (req, res) => {
    try {
        const results = await connection.getAll('farmdata');
        res.status(200).send(results);
    } catch (err) {
        res.status(400).send(err);
    }
})

//get distinct farm names
router.get('/distinct', async (req, res) => {
    try {
        const results = await connection.getDistinct('farmdata',req.query.column);
        console.log(req)
        res.status(200).send(results);
    } catch (err) {
        res.status(400).send(err);
    }
})

//get by farm
//req.body.name
router.get('/search', async (req, res) => {
    const results = await connection.search('farmdata','farmname',req.query.farmname)
    res.status(200).send(results);
})

// clear and init with csv-files
router.get('/init')

module.exports = router;