/* eslint linebreak-style: ["error", "windows"] */
const mongo = require('mongodb');
const mongoClient = require('mongodb').MongoClient;
const { dbOptions } = require('./config');



const urlDB = dbOptions.dbUrl;
// Connexion
mongoClient.connect(urlDB, function(err, db) {
  if (err) throw err;
  console.log('Database created!');
  db.close();
});

module.exports = mongo;
