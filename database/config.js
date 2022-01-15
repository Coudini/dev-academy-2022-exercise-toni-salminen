require('dotenv').config();

// Configuration for data-credentials
// Credentials found in .env -file (.env -file added to .gitignore)

const config = {
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
};

module.exports = config;