const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const indexRouter = require('./routes/index');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

app.set('view engine', 'ejs');
app
  .use(bodyParser.json())
  .use(session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
  }))
  .use(passport.initialize())
  .use(passport.session());

app.use((req, res, next)=> {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
})
  
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
})
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
})

app.get('/github/callback', passport.authenticate('github', 
{ failureRedirect: '/login' }), 
    (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
})

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