//db에 추가하는 작업
const path = require('path');

const express = require('express');
const login = require('./login');//register 성공했다는 표시 어떻게 할지 고민하기

const router = express.Router();

router.get('/register', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../','views', 'register.html'));
});

module.exports = router;