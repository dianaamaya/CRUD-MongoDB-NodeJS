const router = require("express").Router();

// Controllers
const {
  renderSignUpForm,
  singup,
  renderSigninForm,
  signin,
  logout
} = require("../controllers/users.controller");

// Routes

// to get sign up form
router.get("/users/signup", renderSignUpForm);

// to register the user
router.post("/users/signup", singup);

// to get sign in form
router.get("/users/signin", renderSigninForm);

// to sign in the user
router.post("/users/signin", signin);

// to log out the user
router.get("/users/logout", logout);

module.exports = router;