//const session = require("express-session");
const passport = require('passport');
//   , LocalStrategy = require('passport-local').Strategy;
const db = require("../models/user");
const bcrypt = require("bcrypt");
require('../auth/passport');


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

        if ( !uname || !pw ) {
                throw new Error('username and password required'); // username or password not typed
        }

        if ( !pwCheck ) {
            throw new Error('password check required'); // password not checked
        }

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
        res.redirect("/");

    } catch (error) {
        console.trace(error);
        res.redirect('/register');
    }

};


exports.postLogin = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
});

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}

exports.mainPage = (req, res, next) => {
    res.render('main', {pageTitle: 'Main Page'});
};

exports.getLogin = (req, res, next) => {
    res.render('login', {pageTitle: 'Login Page'});
};


// exports.postRegister = async (req, res, next) => {

    // try{
    //     console.log(req.body);
    //     const uname = req.body.username;
    //     const pw = req.body.password;
    //     const pwCheck = req.body.passwordCheck;
    //     const saltRounds = 10;
        
    //     db.getConnection( function (err, connection) {
    //         if(err) {
    //             connection.release();
    //             throw err;
    //         }

    //         if (connection) {
    //             console.log('mysql pool connected: threadId ' + connection.threadId);

    //             const conn = connection.promise();
    //             const [selectUser, userFields] = await conn.query("SELECT username from users WHERE username = ?", [uname] );

    //             if( selectUser.length >0 ) {
    //                 throw new Error("username already in use");
    //             }
        
    //             if( pw !== pwCheck ) {
    //                 throw new Error("passwords do not match");
    //             }

    //             const hashedPwd = await bcrypt.hash(pw, saltRounds); 
                
    //             const insertInfo = await conn.query("INSERT INTO users SET ? ", { username: uname , password: hashedPwd});

    //             connection.release();
    //             console.log("Inserted new username, password into database", insertInfo);
    //             res.redirect("/login");
    //         }

    //     })
//     catch (error) {
//         console.trace(error);
//         res.redirect('/register');
//     }

// };

// exports.postLogin = async (req, res, next) => {
// try {
        // console.log(req.body); // check user info
        // const uname = req.body.username;
        // const pw = req.body.password;

        // if ( !uname || !pw ) {
        //     throw new Error('username or password required'); // username or password not typed
        // }

        // db.getConnection( async (err, connection) => {
        //     if (err) {
        //         connection.release();
        //         throw err;
        //     }
        //     if (connection) {
        //         console.log('mysql pool connected: threadId ' + connection.threadId);
        //         const conn = connection.promise();
        //         const [userResults, userFields] = await conn.query('SELECT * FROM `users` WHERE `username`=? ', [uname]);

        //         connection.release();

        //         console.log(userResults);

        //         if (!userResults.length) {
        //             throw new Error('user not found'); // db record not found
        //         }
                
        //         const compare = await bcrypt.compare(pw, userResults[0].password); // return true or false
                
        //         if ( !compare ) {
        //         throw new Error('password not matched');
        //         }
        //         console.log('login success');
        //         res.redirect('/');
        //     }
        // })
//     } catch (error) {
        
//         console.trace(error);
//         res.redirect('/login');

//    }
// }
