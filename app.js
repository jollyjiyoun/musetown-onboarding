const express = require('express'); 
// const session = require("express-session");
const bodyParser = require('body-parser');
// const passport = require('passport')
//  , LocalStrategy = require('passport-local').Strategy;
const mainPage = require('./routes/main');
const login = require('./routes/login');
const logout = require('./routes/logout');
const register = require('./routes/register');
const path = require('path');
const PORT = 5000;

//create express application
const app = express();

// app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.static(path.join(__dirname, 'public'))); //enable using static files
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new LocalStrategy(
//     function(username, password, done) {
//       User.findOne({ username: username }, function(err, user) {
//         if (err) { return done(err); }
//         if (!user) {
//           return done(null, false, { message: 'Username does not exist.' });
//         }
//         if (!user.validPassword(password)) {
//           return done(null, false, { message: 'Incorrect login information. Please try again.' });
//         }
//         return done(null, user);
//       });
//     }
//   ));

app.set('view engine', 'ejs');
app.set('views', 'views');

// main page before login and register
app.use(mainPage);

//login page
app.use('/login', login);

//logout page
app.use(logout);

//register page
app.use(register);

//404 page
app.use((req,res, next) => {
    res.status(404).render('404', {pageTitle: 'Page Not Found'})
});

app.listen(PORT, function(err){
  if(err) console.log(err);
  console.log("Server listening on PORT", PORT);
});