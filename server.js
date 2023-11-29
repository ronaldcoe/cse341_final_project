const express = require('express');
const app = express();
const mongodb = require('./data/database');



// Start server
/*app.listen(3000, () => {
  console.log('Server is running on port 3000');
})*/


//Updated server.js to use the new database module
mongodb.initDb((err) => {
  if(err) {
      console.log('Error connecting to database', err);
  } else {
      app.listen(process.env.PORT || port, () => {
          console.log('Database is connected and Server running on port ' + (process.env.PORT || port));
      });
  }
}); 