const express = require('express');
const bodyParser = require('body-parser');

const router = require('./routes/routes');
const {
  notFound,
  developmentErrors,
  productionErrors,
} = require('./utils/errorHandlers');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.use(notFound);

if (app.get('env') === 'development') {
  app.use(developmentErrors);
}

app.use(productionErrors);

module.exports = app;
