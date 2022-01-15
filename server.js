require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = express.Router();
const path = require('path');
const connection = require('./database/crud.js');

router.use(
    express.json(),
    cors(),
    //express.static('build')
);

// Have Node serve the files for our built React app
router.use(express.static(path.resolve(__dirname, './build')));

// Handle GET requests to /api route
router.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './build', 'index.html'));
});

// Different routings for data requests

//get all
router.get('/api/farmdata', async (req, res) => {
    try {
        const results = await connection.getAll('farmdata');
        res.status(200).send(results);
    } catch (err) {
        res.status(400).send(err);
    }
})

//get distinct farm names
router.get('/api/distinct', async (req, res) => {
    try {
        const results = await connection.getDistinct('farmdata',req.query.column);
        res.status(200).send(results);
    } catch (err) {
        res.status(400).send(err);
    }
})

//get by farmname
router.get('/api/searchfarm', async (req, res) => {
    const results = await connection.searchFarm('farmdata','farmname',req.query.farmname)
    res.status(200).send(results);
})

// get by metrictype
router.get('/api/searchmetric', async (req, res) => {
    const results = await connection.searchMetric('farmdata','metrictype',req.query.metrictype)
    res.status(200).send(results);
})

// get by metrictype and farmname
router.get('/api/searchfarmmetric', async (req, res) => {
    const results = await connection.searchFarmMetric('farmdata','farmname','metrictype',req.query.metrictype,req.query.farmname)
    res.status(200).send(results);
})

module.exports = router;