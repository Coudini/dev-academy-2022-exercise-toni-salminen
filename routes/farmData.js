const express = require('express');
const router = express.Router();
router.use(express.json());

const path = require('path');

const publicPath = path.join(__dirname, '../build/index.html', 'public');
router.use(express.static(publicPath));
router.use(express.static('build'));

const connection = require('../database/crud');

router.get('*', function (req,res) {
    res.sendFile(path.resolve('../build/index.html'));
})

// Different routings for data requests

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
        res.status(200).send(results);
    } catch (err) {
        res.status(400).send(err);
    }
})

//get by farmname
router.get('/searchfarm', async (req, res) => {
    const results = await connection.searchFarm('farmdata','farmname',req.query.farmname)
    res.status(200).send(results);
})

// get by metrictype
router.get('/searchmetric', async (req, res) => {
    const results = await connection.searchMetric('farmdata','metrictype',req.query.metrictype)
    res.status(200).send(results);
})

// get by metrictype and farmname
router.get('/searchfarmmetric', async (req, res) => {
    const results = await connection.searchFarmMetric('farmdata','farmname','metrictype',req.query.metrictype,req.query.farmname)
    res.status(200).send(results);
})

module.exports = router;