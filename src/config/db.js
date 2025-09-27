const knex = require('knex');
require('dotenv').config();

const db = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URI,
  searchPath: ['public']
});

module.exports = db;
