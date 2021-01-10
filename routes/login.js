const express = require('express');
const session = require("express-session");
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const path = require('path');

const loginSuccess = require('./loginSuccess');//loginsuccess redirect 어떻게 처리할지 고민하기

const router = express.Router();

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../','views', 'login.html'));
});

router.get('/auth', 
    passport.authenticate('local', { successRedirect: '/loginSuccess', failureRedirect: '/login', failureFlash: true }));

module.exports = router;