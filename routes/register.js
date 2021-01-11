//db에 추가하는 작업
const express = require('express');
const authController = require('../controllers/auth');
//const login = require('./login'); register 성공했다는 표시 어떻게 할지 고민하기

const router = express.Router();

router.get('/register', authController.getRegister);

router.post('/register/type', authController.postRegister);

module.exports = router;