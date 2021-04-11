const mysql = require('mysql');
const tableStructures = require('../models/TableStructures');

const connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'milansql'
})

function check_table(struct){

    struct.forEach((element) => {
        create_table_query = `Create table if not exists ice.${element[0]} (${element[1]})`;
        connect.query(create_table_query, async function(err, result){
            if(err) throw err;
        })
    })
}

function connection(){
    connect.connect(function(err){
        if(err) throw err;
        console.log("Connected");
        
        db_check = "create database if not exists ice";

        connect.query(db_check, function(err, result){
            if(err) throw err;
            check_table(tableStructures);
        })
    })
}

module.exports = {
    connect,
    connection
};