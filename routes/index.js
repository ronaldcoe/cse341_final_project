//Import necessary modules
const router = require("express").Router();
const passport = require('passport');
const path = require('path');


router.use("/", require("./swagger"));  // Use the "/api-docs" route defined in the "swagger" module
router.get('/', (req, res) => {
    res.render('index', {user: req.session.user});
});

// login route
router.use('/login', passport.authenticate('github'), (req, res) => {});

// logout route
router.use('/logout', (req, res) => {
    req.logout(function(err) {
        if(err) {
            return next(err)
        }
        res.redirect('/');
    })
   
})


// Use the "/teams" route defined in the "teams" module
router.use("/teams", require("./teams"));
// Use the "/players" route defined in the "players" module
router.use("/players", require("./players"));
// Use the "/coaches" route defined in the "coaches" module
router.use("/coaches", require("./coaches"));
// Use the "/matches" route defined in the "matches" module
router.use("/matches", require("./matches"));


module.exports = router;