const express = require('express');

const cors = require('cors');
const compression = require('compression');


const productApiRouter = require('./routes/appRoutes/appApi');

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
app.use('/api', productApiRouter);


// done! we export it so we can start the site in start.js
module.exports = app;