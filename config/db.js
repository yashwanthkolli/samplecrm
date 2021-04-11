const mysql = require('mysql');

const connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'milansql'
})

function connection(){
    connect.connect(function(err){
        if(err) throw err;
        console.log("Connected");
    })
}

module.exports = connection;