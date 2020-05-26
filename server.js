const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportJwt = require('passport-jwt');
const User = require('./Models/User');
const router = require('./routes/routes');
const { notFound } = require('./utils/errorHandlers');

const app = express();
// passport settings
passport.use(User.createStrategy());
passport.use(
  new passportJwt.Strategy(
    {
      jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
      algorithms: ['HS256'],
    },
    (payload, done) => {
      User.findById(payload.sub)
        .then((user) => {
          if (user) {
            done(null, user);
          } else {
            done(null, false);
          }
        })
        .catch((error) => {
          done(error, false);
        });
    }
  )
);

// registering middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(passport.initialize());
// registering middleware

app.use('/', router);

app.use(notFound);

module.exports = app;
