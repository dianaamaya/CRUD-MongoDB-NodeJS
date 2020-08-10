const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Models
const User = require('../models/User'); 

/**
 * local strategy - authentication check
 * 
 * @param {String} usernameField - field used to get the user
 * @param {String} email - req parameter
 * @param {String} password - req parameter
 * @param {Function} done - callback
 */
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  // match email's user
  const user = await User.findOne({email: email});
  if (!user) {
    //if email was not found return false
    return done(null, false, { message: 'Not User found.' });
  } else {
    // match password's user
    const match = await user.matchPassword(password);
    if(match) {
      // if the passwords match, return user
      return done(null, user);
    } else {
      //in other case return false
      return done(null, false, { message: 'Incorrect Password.' });
    }
  }
}));

/** 
  * store the user id in the session
  */
passport.serializeUser((user, done) => {
  done(null, user.id);
});

/** 
  * remove the user with that id from the session
  */
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});