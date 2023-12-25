const authHelper = require('../helpers/auth-helper');

const indexController = {
  getIndex: (req, res, next) => {
    res.render('index', { title: 'Express' });
  },

  getIndexJson: (req, res, next) => {
    res.json({ message: 'Welcome to Express' });
  },
};

module.exports = indexController;
