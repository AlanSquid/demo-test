const mathUtils = require('../utils/mathUtils');

const userServices = {
  calculate: (req, cb) => {
    try {
      const { a, b, mathType } = req.body;
      let result;
      if (mathType === 'add') {
        result = mathUtils.add(a, b);
      } else if (mathType === 'multiply') {
        result = mathUtils.multiply(a, b);
      }
      
      // 常見的命名慣例:
      // res.render('template', locals) 中的 locals 包含將傳遞給模板的本地數據。
      // res.json(data) 中的 data 包含要發送到客戶端的 JSON 數據。
      const locals = { result }; // 回傳ejs模板用的變數，常見命名用locals
      cb(null, locals);
    } catch (err) {
      cb(err);
    }
  },
};

module.exports = userServices;
