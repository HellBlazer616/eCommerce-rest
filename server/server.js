const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const router = require('./routes/routes');
const {
  notFound,
  developmentErrors,
  productionErrors,
} = require('./utils/errorHandlers');

const app = express();

// registering middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
// registering middleware

app.use('/', router);

app.use(notFound);

if (app.get('env') === 'development') {
  app.use(developmentErrors);
}

app.use(productionErrors);

module.exports = app;
