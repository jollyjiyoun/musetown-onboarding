const session = require("express-session");
// const passport = require('passport')
//   , LocalStrategy = require('passport-local').Strategy;
const db = require("../models/user");
const bcryptjs = require("bcryptjs");

exports.getRegister = (req, res, next) => {
    res.render('register', {pageTitle: 'Register Page'})
};

exports.postRegister = (req, res, next) => {
    console.log(req.body);
    const uname = req.body.username;
    const pw = req.body.password;
    const pwCheck = req.body.passwordCheck;
   
    db.query("SELECT username FROM users WHERE username = ?", [uname], async (err, results) => {
        if (err) {
            console.log(err);
            res.redirect('/register');
        } if ( results.length >0 ){ 
            return res.render('/register', {message:"This username is already in use."});
        } else if (pw !== pwCheck) {
            return res.render('/register', {message: "Passwords do not match."})
        }
        
        let hashedPwd = await bcryptjs.hash(pw, 8);
        console.log(hashedPwd);
        db.query("INSERT INTO users SET ? ", { username: uname , password: hashedPwd}, (err, results) => {
            if (err) {
                console.log (err);
            } else { 
                console.log("Inserted new username, password into database");
                res.redirect("/login");
            }
        });
    });
};

exports.mainPage = (req, res, next) => {
    res.render('main', {pageTitle: 'Main Page'});
};

exports.getLogin = (req, res, next) => {
    res.render('login', {pageTitle: 'Login Page'});
};

exports.postLogin = (req, res, next) => {
    const uname = req.body.username;
    const pw = req.body.password;

    db.query("SELECT * FROM users WHERE username = ?", [uname], async (err, results) => {
        if(err) {
            console.log(err);
            res.render('/login');
        } else if ( !uname || !pw ) {
            console.log("Did not type username or password");
            return res.render('/login', {message: "Please type in both the username and password"});
        } else if ( !results.length || !(await bcryptjs.compare(results[0].password, pw))) {
            console.log("Incorrect login information");
            return res.render('/login', {message: "Incorrect login information"});
        } else {
            console.log("login success!");
            return res.redirect('/');
        }
    })
    console.log(req.body);
    res.render('main', {pageTitle: 'Login Page'});
}
