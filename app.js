const express = require('express'); 
const bodyParser = require('body-parser');
const mainPage = require('./routes/main');
const login = require('./routes/login');
const logout = require('./routes/logout');
const register = require('./routes/register');
const PORT = 5000;

//create express application
const app = express();

app.use(bodyParser.urlencoded({extended: false}));

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