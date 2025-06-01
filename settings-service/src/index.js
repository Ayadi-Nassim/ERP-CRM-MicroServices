require('dotenv').config();
require('module-alias/register');
const express = require('express');
const mongoose = require('mongoose');
const settingRoutes = require('./routes/settingsRoutes');

const app = express();
app.use(express.json());

mongoose.connect(process.env.DATABASE).then(() => {
  console.log('🟢 DB connected');
  app.listen(process.env.PORT || 8881, () => {
    console.log(`🚀 Settings service running on port ${process.env.PORT}`);
  });
});

app.use('/api/', settingRoutes);
