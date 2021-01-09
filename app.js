const express = require('express'); 
const bodyParser = require('body-parser');
const login = require('./routes/login');
const path = require('path');

//create express application
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(login);

app.use((req,res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(5000);