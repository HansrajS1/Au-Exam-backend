require('dotenv').config();
const knex = require('knex');

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",         
    port: 5432,
    user: "postgres",           
    password: "admin",  
    database: "au_exam"
  }
});

module.exports = db;



// require('dotenv').config();
// const knex = require('knex');

// const db = knex({
//   client: 'pg',
//   connection: process.env.POSTGRES_URI,
//   searchPath: ['public'],
//   pool: {
//     min: 5,
//     max: 25,
//     acquireTimeoutMillis: 30000
//   }
// });

module.exports = db;