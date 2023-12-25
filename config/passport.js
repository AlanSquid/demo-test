const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
// 假資料庫
const db = require('../db/db.json')

// 模組導出到app.js中使用
module.exports = app => {
  // 初始化passport模組
  app.use(passport.initialize())
  app.use(passport.session())

  // 設置本地登入策略
  passport.use(new LocalStrategy({
    usernameField: 'account'
  },
    (account, password, done) => {
      const user = db.user
      if (account === user.account && password === user.password) {
        return done(null, user)
      } else {
        return done(null, false, { message: '找不到此用戶！' })
      }
    }))

  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    const user = db.user
    if (id === user.id) {
      done(null, user)
    }
  })
}