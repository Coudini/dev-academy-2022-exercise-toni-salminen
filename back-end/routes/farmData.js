const express = require('express');
const router = express.Router();
router.use(express.json())

const connection = require('../database/crud');

router.get('/', async (req, res) => {
    try {
        const results = await connection.getAll('farmdata');
        res.status(200).send(results);
    } catch (err) {
        res.status(400).send(err);
    }
})

module.exports = router;