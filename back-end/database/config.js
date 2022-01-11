require('dotenv').config();

const config = {
    host: process.env.host,
    user: process.env.user,
    database: process.env.database,
    password: process.env.password
};

module.exports = config;