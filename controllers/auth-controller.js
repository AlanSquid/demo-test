const userController = {
  getLoginPage: (req, res, next) => {
    res.render('login');
  },

  logout: (req, res, next) => {
    req.logout(err => {
      if (err) { return next(err) }
      res.redirect('/')
    })
  }
};

module.exports = userController;
