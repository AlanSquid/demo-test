var express = require('express');
var router = express.Router();
const userController = require('../../controllers/user-controller');

/* GET users listing. */
router.get('/', userController.getUserPage);
router.post('/calculate', userController.calculate);

module.exports = router;
