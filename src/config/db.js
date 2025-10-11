import dotenv from 'dotenv';
import knex from 'knex';

const db = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URI,
  searchPath: ['public'],
  pool: {
    min: 5,
    max: 25,
    acquireTimeoutMillis: 30000
  }
});

export default db;
