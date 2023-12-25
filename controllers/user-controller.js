const mathUtils = require('../utils/mathUtils');
const userServices = require('../services/user-services')

const userController = {
  getUserPage: (req, res, next) => {
    const result = 0
    res.render('user', { result });
  },
  // 這邊試作將controller中邏輯運算的部份獨立出一個service層
  calculate: (req, res, next) => {
    userServices.calculate(req, (err, locals) => err ? next(err) : res.render('user', locals))
  },
};
// route、controller、service分離：
// route：路由規劃
// controller：專門處理req(例如：req的輸入驗證)、res以及error
// service：相關的邏輯運算
// 好處：由於route、controller、service的工作分離後各項作業會較明確，對單位測試、維護也會較容易

module.exports = userController;