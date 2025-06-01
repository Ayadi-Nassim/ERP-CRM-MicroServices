// billing-service/src/app.js

const express = require('express');
const cors = require('cors');
const compression = require('compression');
const cookieParser = require('cookie-parser');


const coreDownloadRouter = require('./routes/coreRoutes/coreDownloadRouter');
const corePublicRouter = require('./routes/coreRoutes/corePublicRouter');

const errorHandlers = require('./handlers/errorHandlers');
const billingApi = require('./routes/appRoutes/appApi');

const fileUpload = require('express-fileupload');

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
// API Routes
app.use('/api', billingApi);
app.use('/download', coreDownloadRouter);
app.use('/public', corePublicRouter);


// Error Handlers
app.use(errorHandlers.notFound);
app.use(errorHandlers.catchErrors);

module.exports = app;
