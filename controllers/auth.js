//const session = require("express-session");
// const passport = require('passport')
//   , LocalStrategy = require('passport-local').Strategy;
const db = require("../models/user");
const bcrypt = require("bcrypt");

exports.getRegister = (req, res, next) => {
    res.render('register', {pageTitle: 'Register Page'})
};

exports.postRegister = (req, res, next) => {
    console.log(req.body);
    const uname = req.body.username;
    const pw = req.body.password;
    const pwCheck = req.body.passwordCheck;
    const saltRounds = 10;
   
    db.query("SELECT username FROM users WHERE username = ?", [uname], async (err, results) => {
        if (err) {
            console.log(err);
            res.render('register', {pageTitle: 'Register Page'});
        } if ( results.length >0 ){ 
            res.render('register', {message:"This username is already in use.", pageTitle: 'Register Page'});
        } else if (pw !== pwCheck) {
            res.render('register', {message: "Passwords do not match.", pageTitle: 'Register Page'});
        }

        const hashedPwd = await bcrypt.hash(pw, saltRounds);
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

exports.postLogin = (req, res, next) => {
    console.log(req.body);
    const uname = req.body.username;
    const pw = req.body.password;

    db.query("SELECT * FROM users WHERE username = ?", [uname], async (err, results) => {
        console.log("results[0].password", results[0].password);
        console.log("pw", pw);
        if(err) {
            console.log(err);
            res.render('/login', {pageTitle: 'Login'});
        } else if ( !uname || !pw ) {
            console.log("Did not type username or password");
            res.render('login', {message: "Please type in both the username and password", pageTitle: 'Login'});
        } else if ( !results.length ) {
            console.log("Username does not exist");
            res.render('login', {message: "Username does not exist"});
        } 
        const compare = await bcrypt.compare(results[0].password, pw);
        if (!(compare)){
            console.log("Incorrect Login Information");
            res.render('login', {message: "Invalid Login Information", pageTitle: 'Login'});
        } else {
            console.log("login success!");
            res.redirect('/');
        }
    })
    console.log(req.body);
    res.render('main', {pageTitle: 'Login Page'});
}

exports.mainPage = (req, res, next) => {
    res.render('main', {pageTitle: 'Main Page'});
};

exports.getLogin = (req, res, next) => {
    res.render('login', {pageTitle: 'Login Page'});
};
