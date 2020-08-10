const express = require("express");
const router = express.Router();

// Controllers
const { renderIndex, renderAbout } = require("../controllers/index.controller");

// main page
router.get("/", renderIndex);

// about page
router.get("/about", renderAbout);

module.exports = router;