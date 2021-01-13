const passport = require("passport")
    , LocalStrategy = require("passport-local").Strategy;
const db = require("../models/user");
const bcrypt = require("bcrypt");

passport.serializeUser(function(user, done) { //store info in session store when login success
    console.log("Serialize User", user);
    done(null, user.id);
  });
  
passport.deserializeUser(async function(id, done){ // authenticate user when request
    try{
        console.log("Deserialize User", id);
        const authUser = await db.query('SELECT * FROM `users` WHERE `ID` = ?', [id]);
        console.log("deserializeUser mysql result: ", authUser[0][0]);
        done(null, authUser[0][0]);
    } catch (error){
        console.trace(error);
    }
});

passport.use('local', new LocalStrategy (

    async function (username, password, done) {

        try {
            if ( !username || !password ) {
                console.log("username and password required");
                return done(null, false, {message: 'username and password required'}); // username or password not typed
            };

            const [userResults, userFields] = await db.query('SELECT * FROM `users` WHERE `username`=? ',
            [username]
            );
            
            console.log(userResults);
            
            if (!userResults.length) {
                return done(null, false, {message: 'user not found'}); // db record not found
            }
            
            const compare = await bcrypt.compare(password, userResults[0].password); // return true or false
            
            if ( !compare ) {
                return done(null, false, {message: 'password not matched'});
            }
            
            console.log('login successfully authenticated');
            return done(null, userResults[0]);
        } catch (error) {
            return done(error);
        }
    }
        
));

module.exports = passport;