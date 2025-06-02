const { Client } = require('pg');
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'student management',
  password: 'Krishna@123',
  port: 5432,
});

client.connect();

client.on('connect', () => {
  console.log('Database connected');
});

client.on('error', (err) => {
  console.error('DB connection error', err);
});

module.exports = client;
