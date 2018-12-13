const express = require('express');
const passport = require('passport');
const passportLocal = require('passport-local');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const { jwtOptions } = require('../config');
const mongoClient = require('../mongo');
const { dbOptions } = require('../config');


const router = express.Router();
const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

passport.use(new LocalStrategy(
  {
    emailField: 'email',
    passwordField: 'password',
  },
  (email, password, done) => {
    // here you should make a database call
    let userInfoToSend=[];
    mongoClient.connect(dbOptions.dbUrl, function(err, db) {

      if (err) throw err;
      var dbo = db.db(dbOptions.dbName);
      dbo.collection("Users").findOne({ "email":  email}).then(function(dataUser) {
        //if user not found
        if(!dataUser) {
          return done(null, false);
        }
        else {
          console.log(dataUser);
          user = dataUser;

          if(password === dataUser.password)
          {

            userInfoToSend.push({"firstName":dataUser.firstName, "lastName":dataUser.lastName,"email":dataUser.email, "compagny":dataUser.compagny});


            return done(null, userInfoToSend);

          }
          //if password is not correct return 401
          else
          {
            return done(null, false);

          }
        }

      });

    });

  },
));

passport.use(new JWTStrategy(
  {
    secretOrKey: jwtOptions.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  (jwtPayload, done) => {
    const { userId } = jwtPayload;
    if (userId !== USER.id) {
      return done(null, false);
    }
    return done(null, USER);
  },
));

router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const {password, ...user } = req.user;
  const token = jwt.sign({ userId: user.id }, jwtOptions.secret);
  res.send({ user, token });
});

module.exports = router;