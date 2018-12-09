const express = require('express');
const passport = require('passport');
const mongoClient = require('../mongo');
const { dbOptions } = require('../config');
var validator = require("email-validator");




const router = express.Router();
const authenticated = () => passport.authenticate('jwt', { session: false });
const user = [];

router.get('/public', (req, res) => {
  res.send({ message: 'Hey this is a public message!' })
})

router.post('/register', (req, res) => {

  const { firstName, lastName, email, compagny,password,  passwordConfirmation } = req.body;



  //test email

  if(!validator.validate(email))
  {
    res.sendStatus(422);

  }

  user.push({"firstName":firstName, "lastName":lastName,"email":email, "compagny":compagny,"password":password});




  mongoClient.connect(dbOptions.dbUrl, function(err, db) {

    if (err) throw err;
    var dbo = db.db(dbOptions.dbName);
    dbo.collection("Users").insert(req.body, function(err, res) {
      // if error send code 500
      if (err)
      {
        res.sendStatus(500);
        throw err;

      }

      // if the user has been added successfully in the DB send code 200
      db.close();
    });

  });

  res.sendStatus(200);

})

router.get('/private', authenticated(), (req, res) => {
  res.send({ message: 'Hey this is a private message!' });
})

router.get('/me', authenticated(), (req, res) => {
  res.send({ user: req.user });
})

module.exports = router;