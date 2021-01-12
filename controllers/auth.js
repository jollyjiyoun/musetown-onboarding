//const session = require("express-session");
// const passport = require('passport')
//   , LocalStrategy = require('passport-local').Strategy;
const db = require("../models/user");
const bcrypt = require("bcrypt");

exports.getRegister = (req, res, next) => {
    res.render('register', {pageTitle: 'Register Page'})
};

exports.postRegister = async (req, res, next) => {

    try{
        console.log(req.body);
        const uname = req.body.username;
        const pw = req.body.password;
        const pwCheck = req.body.passwordCheck;
        const saltRounds = 10;
        
        const [selectUser, userFields] = await db.query("SELECT username from users WHERE username = ?",
         [uname]
        );

        if( selectUser.length >0 ) {
            throw new Error("username already in use");
        }

        if( pw !== pwCheck ) {
            throw new Error("passwords do not match");
        }

        const hashedPwd = await bcrypt.hash(pw, saltRounds);    

        // const [insertInfo, insertUserFields]
        const insertInfo = await db.query("INSERT INTO users SET ? ", { username: uname , password: hashedPwd});

        console.log("Inserted new username, password into database", insertInfo);
        res.redirect("/login");

    } catch (error) {
        console.trace(error);
        res.redirect('/register');
    }

};

exports.postLogin = async (req, res, next) => {

    try {
        console.log(req.body); // check user info
        const uname = req.body.username;
        const pw = req.body.password;

        if ( !uname || !pw ) {
            throw new Error('username or password required'); // username or password not typed
        }
        
        const [userResults, userFields] = await db.query('SELECT * FROM `users` WHERE `username`=? ',
         [uname]
        );
        
        console.log(userResults);
        
        if (!userResults.length) {
         throw new Error('user not found'); // db record not found
        }
        
        const compare = await bcrypt.compare(pw, userResults[0].password); // return true or false
        
        if ( !compare ) {
         throw new Error('password not matched');
        }
        
        console.log('login success');
        res.redirect('/');
        
       } catch (error) {
        
        console.trace(error);
        res.redirect('/login');

       }
}

exports.mainPage = (req, res, next) => {
    res.render('main', {pageTitle: 'Main Page'});
};

exports.getLogin = (req, res, next) => {
    res.render('login', {pageTitle: 'Login Page'});
};
