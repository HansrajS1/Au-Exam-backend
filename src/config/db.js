require('dotenv').config();
const knex = require('knex');

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",           // or 'localhost'
    port: 5432,
    user: "postgres",            // or your custom user
    password: "admin",   // the one you set during install
    database: "au_exam"
  }
});

module.exports = db;
