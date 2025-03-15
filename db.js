const { Pool } = require('pg');
// require('.env').config();

const pool = new Pool({
  user: 'root', // Replace with your PostgreSQL username
  host: 'dpg-cvaejlnnoe9s73f83ed0-a.oregon-postgres.render.com', // PostgreSQL host on Render
  database: 'moto_db_mdly', // Replace with your PostgreSQL database name
  password: 'ZmBlC74h6uCW9P77PgSHzoYdIJQQYLIc', // Replace with your PostgreSQL password
  port: 5432, // PostgreSQL port
  ssl: {
    rejectUnauthorized: false, // This allows SSL without verifying the certificate
  }
});

module.exports = pool;
