const fs = require('fs')
const db = require('../db.js');
const pgPromise = require('pg-promise')();
require('dotenv').config();

const blankdb = fs.readFileSync('./Reviews/db/model.sql').toString();

db.query(blankdb)
  .then(() => {
    console.log('copying')
    return Promise.all([
      db.none(`COPY Reviews FROM '/Users/noahclouthier/downloads/reviews.csv' CSV HEADER`)
    ])
  })

