const indexCtrl = {};

/**
  * render the main page
  */
indexCtrl.renderIndex = (req, res) => {
  res.render('index');
};

/**
  * render the about page
  */
indexCtrl.renderAbout = (req, res) => {
  res.render('about');
};

module.exports = indexCtrl;