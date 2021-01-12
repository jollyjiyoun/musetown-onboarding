const mysql = require("mysql2");
const dotenv = require('dotenv');

dotenv.config({path: './.env'});

var pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT
});

let promisedPool = pool.promise();

module.exports = promisedPool;


// const db = mysql.createConnection({
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE,
//     port: process.env.DATABASE_PORT
// });

// db.connect((err) => {
//     if(err) {
//         console.log(err);
//     } else{
//         console.log("MySQL connected...");
//     }
// });

// module.exports = db;
