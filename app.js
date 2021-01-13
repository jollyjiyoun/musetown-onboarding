const express = require('express'); 
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
const MySQLStore = require('express-mysql-session')(session);
const db = require('./models/user');
const dotenv = require('dotenv');
const mainPage = require('./routes/main');
const login = require('./routes/login');
const logout = require('./routes/logout');
const register = require('./routes/register');
const path = require('path');
const PORT = 5000;

dotenv.config({path: './.env'});

const options = { 
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DATABASE_PORT
};

const sessionStore = new MySQLStore(options);

//create express application
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public'))); // static file access

app.use(
  session({
    secret:"my_secret",
    resave: false, //do not save when session modified
    saveUninitialized: true, //save uninitialized when save session to session store 
    store: sessionStore
  })
);

app.use(passport.initialize());
app.use(passport.session());

//require('./auth/passport')();

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