const express = require('express');
const passport = require('passport');
const mongoClient = require('../mongo');
const { dbOptions } = require('../config');
var validator = require("email-validator");




const router = express.Router();
const authenticated = passport.authenticate('jwt', { session: false });
const user = [];

router.get('/public', (req, res) => {
  res.send({ message: 'Hey this is a public message!' });


})

router.post('/project', (req, res)  => {
  const project = [];
  const { projectName, description, amount, timeEstimated, technologies, deadline} = req.body;




  if(projectName== null || amount<0 || timeEstimated <0 || description== null || technologies == null || deadline == null)
  {
    res.sendStatus(422);
    return

  }


  project.push({"projectName":projectName, "amount":amount,"description":description,"timeEstimated":timeEstimated, "technologies":technologies,"deadline":deadline});

  mongoClient.connect(dbOptions.dbUrl, function(err, db) {

    if (err) throw err;
    var dbo = db.db(dbOptions.dbName);
    dbo.collection("Projects").insert(project, function(err, res) {
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

});

router.put('/project/:id', (req, res)  => {
  const project = [];

  mongoClient.connect(dbOptions.dbUrl, function(err, db) {

    if (err) throw err;
    let dbo = db.db(dbOptions.dbName);
    let projectData = null;

    var o_id = new mongoClient.ObjectID(req.params.id);


    //TODO check if date < now
    if(req.body.hasOwnProperty("amount") && req.body.amount <0)
    {
      res.sendStatus(422);
      return
    }

    dbo.collection("Projects").findOne({"_id":o_id}).then(function (dataProject) {
      projectData = dataProject;
      for(var key in projectData) {
        if(projectData.hasOwnProperty(key) && req.body.hasOwnProperty(key)){
          projectData[key]=req.body[key];
        }
      }


      var newvalues = {
        $set: projectData
      }


      dbo.collection("Projects").updateOne({"_id":o_id},newvalues);

      res.sendStatus(200);

    });
  });

})

router.post('/register', (req, res) => {

  const { firstName, lastName, email, compagny,password } = req.body;



  //test email

  if(!validator.validate(email))
  {
    res.sendStatus(422);

  }

  user.push({"firstName":firstName, "lastName":lastName,"email":email, "compagny":compagny,"password":password});




  mongoClient.connect(dbOptions.dbUrl, function(err, db) {

    if (err) throw err;
    var dbo = db.db(dbOptions.dbName);
    dbo.collection("Users").insert(user, function(err, res) {
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

router.get('/private', authenticated, (req, res) => {
  res.send({ message: 'Hey this is a private message!' });
})

router.get('/me', authenticated, (req, res) => {
  res.send({ user: req.user });
})

module.exports = router;