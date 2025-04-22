// backend/db.js
require('dotenv').config();
console.log('Connecting to DB with user=', process.env.DB_USER);

// rest of your pool setup…

const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host:     process.env.DB_HOST,
  user:     process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit:    10
});
module.exports = pool;
