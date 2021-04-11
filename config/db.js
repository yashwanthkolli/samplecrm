const mysql = require('mysql');
const tableStructures = require('../models/TableStructures');

const connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'milansql'
})

function check_table(){
    check_table_query = "Create table [if not exists] Leads()";
    connect.query(create_table_query, async function(err, result){
        if(result === 'undefined'){
            connect.query("Create table Leads ")
        }
    })
}

function connection(){
    connect.connect(function(err){
        if(err) throw err;
        console.log("Connected");
        
        db_check = "Show database like 'ice'";
        connect.query(db_check, async function(err, result){
            if(result === 'undefined'){
                connect.query("Create database ice", function(err, result){
                    if(err) throw err;
                    console.log("Database Created!");
                })
            } else {
                console.log("Go Ahead. Database already in place");
            }
        })

        check_table(tableStructures);
    })
}

module.exports = connection;