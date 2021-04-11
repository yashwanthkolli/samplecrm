const mysql = require('mysql');
const tableStructures = require('../models/TableStructures');

const connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'milansql'
})

function check_table(struct){

    struct.forEach((element) => {
        // check_table_query = `Show table from ice like ${element[0]} `;
        create_table_query = `Create table if not exists ice.${element[0]} (${element[1]})`;
        // connect.query(check_table_query, async function(err, result){
        //     if(!result){
                connect.query(create_table_query, async function(err, result){
                    if(err) throw err;
                    console.log("table created");
                })
        //     }
        // })
    })
}

function connection(){
    connect.connect(function(err){
        if(err) throw err;
        console.log("Connected");
        
        db_check = "Show databases like 'ice'";

        connect.query(db_check, function(err, result){
            if(!result){
                connect.query("Create database ice", function(err, result){
                    if(err) throw err;
                })
            } else {
                console.log("Go Ahead. Database already in place");
                check_table(tableStructures);
            }
        })
    })
}

module.exports = connection;