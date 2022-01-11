require('dotenv').config();

const config = {
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
};

module.exports = config;