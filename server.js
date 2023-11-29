const express = require('express');
const app = express();
const mongodb = require('./data/database');
const indexRouter = require('./routes/index');
// Start server
mongodb.initDb(err=> {
  if(err){
      console.log(err);
  }else{
      app.listen(3000);

      console.log('Listening on port 3000')
      app.use('/', indexRouter)
  }
})