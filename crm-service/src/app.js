const express = require('express');

const cors = require('cors');
const compression = require('compression');


const errorHandlers = require('./handlers/errorHandlers');
const crmApiRouter = require('./routes/appRoutes/appApi');

// create our Express app
const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(compression());

// // default options
// app.use(fileUpload());

// Here our API Routes
app.use('/api', crmApiRouter);


// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// production error handler
app.use(errorHandlers.productionErrors);

// done! we export it so we can start the site in start.js
module.exports = app;