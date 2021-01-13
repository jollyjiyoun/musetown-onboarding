const mysql = require("mysql2");
const dotenv = require('dotenv');

dotenv.config({path: './.env'});

const options = { 
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT
};

//enable execution of multiple queries compared to createConnection()
var pool = mysql.createPool(options);

pool.getConnection ((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
            }
            if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
            }
            if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
            }
            throw new Error(`db connection failed: ${err.message}`)
        }
    if (connection) {
        console.log('mysql pool connected: threadId ' + connection.threadId);
        connection.release();
    }
    return;
});

let promisedPool = pool.promise();

module.exports = promisedPool;

//module.exports = pool;