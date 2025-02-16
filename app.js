const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const path = require('path');
const counterRoutes = require('./routes/index');
const app = express();
const port = process.env.PORT;

const MONGODB_URI = process.env.VERCEL_ENV === 'production' 
    ? process.env.MONGODB_URI_PROD
    : process.env.MONGODB_URI_DEV;

mongoose.connect(MONGODB_URI, {
      dbName: 'counter',
  });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.use('/api', counterRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;