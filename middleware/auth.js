const authHelper = require('../helpers/auth-helper')
authenticator = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/auth/login')
}

module.exports = { authenticator }