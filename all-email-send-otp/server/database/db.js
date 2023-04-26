// const mysql = require("mysql2");
import mysql from 'mysql';

const connection = mysql.createConnection({
    host   : 'localhost',
    user  : 'root',
    password : '',
    database : 'admin'
});


connection.connect((err)=>{
    if(err){
    console.log("DB connected");
}else(
    console.log("database is connecting")
)
});
export default connection ;