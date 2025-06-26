const pool = require('./src/config/db');
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to MySQL');
    connection.release();
  } catch (err) {
    console.error('Database connection error:', err);
  }
}
testConnection();