const { Pool } = require('pg');
require('dotenv').config();

const user = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

user.connect()
.then(()=>console.log("database connect"))
.catch(err=>console.log("database error",err));

module.exports = user;