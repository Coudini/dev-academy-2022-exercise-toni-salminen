//require('dotenv').config();

// Configuration for data-credentials
// Credentials found in .env -file (.env -file added to .gitignore)
const config = {
    host: process.env.host,
    user: process.env.user,
    database: process.env.database,
    password: process.env.password
};

module.exports = config;