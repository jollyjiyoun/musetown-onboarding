const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/logout', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../','views', 'logout.html'));
});
router.get('/register', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../','views', 'register.html'));
});

module.exports = router;