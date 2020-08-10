const usersCtrl = {};

// Models
const User = require('../models/User');

// Modules
const passport = require("passport");

/**
  * get the sign up form
  */
usersCtrl.renderSignUpForm = (req, res) => {
  res.render('users/signup');
};

/**
  * sign up a user
  */
usersCtrl.singup = async (req, res) => {
  let errors = [];
  //get parameters
  const { name, email, password, confirm_password } = req.body;
  //set possible errors
  if (password != confirm_password) {
    errors.push({ text: "Passwords do not match." });
  }
  if (password.length < 4) {
    errors.push({ text: "Passwords must be at least 4 characters." });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name,
      email,
      password,
      confirm_password
    });
  } else {
    // check if the email already exists
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      // if the email is in use, send a erros message 
      req.flash("error_msg", "The Email is already in use.");
      res.redirect("/users/signup");
    } else {
      // if everything is ok, create a new user
      const newUser = new User({ name, email, password });
      //encrypt password
      newUser.password = await newUser.encryptPassword(password);
      //save data in database
      await newUser.save();
      //send a successful message
      req.flash("success_msg", "You are registered.");
      res.redirect("/users/signin");
    }
  }
};

/**
 * get the sign in form
 */
usersCtrl.renderSigninForm = (req, res) => {
  res.render("users/signin");
};

/**
 * sign in a user
 * check authentication with a local strategy
 * if the login was successful render notes page,
 * in other case render the sign in form
 */
usersCtrl.signin = passport.authenticate("local", {
    successRedirect: "/notes",
    failureRedirect: "/users/signin",
    failureFlash: true
  });

 /**
   * log out a user
   */
usersCtrl.logout = (req, res) => {
  // remove user
  req.logout();
  //send message
  req.flash("success_msg", "You are logged out now.");
  res.redirect("/users/signin");
};

module.exports = usersCtrl;