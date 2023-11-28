const express = require('express');
const app = express();
const mongodb = require('./data/database');

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
})