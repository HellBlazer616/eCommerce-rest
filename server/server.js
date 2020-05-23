const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const User = require('./Models/User');
const router = require('./routes/routes');
const {
  notFound,
  developmentErrors,
  productionErrors,
} = require('./utils/errorHandlers');

const app = express();
// passport settings
passport.use(User.createStrategy());

// registering middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(passport.initialize());

// registering middleware

app.use('/', router);

app.use(notFound);

if (app.get('env') === 'development') {
  app.use(developmentErrors);
}

app.use(productionErrors);

module.exports = app;
