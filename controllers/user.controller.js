const { connect } = require('../config/db');
const upload = require('../helpers/upload');
const fs = require('fs');

exports.changePasswordController = (req, res) => {
    const { sid, current, newP} = req.body;

    change_password_query = 'Update railways.users set password = \'' + newP + '\' where sid = \'' + sid + '\' and password = \'' + current + '\'';
    connect.query(change_password_query, function(err, result){
        if(err){
            return res.status(500).json({
                message: "Error Occured"
            })
        } else if(result.affectedRows === 1){
            return res.status(200).json({
                message: "Password Updated Successfully!"
            })
        } else {
            return res.status(500).json({
                message: "Error Occured"
            })
        }
    })
}

exports.addUserController = (req, res) => {
    const {
        first,
        last,
        pswd,
        role,
        oname,
        newsid,
        scd
    } = req.body;
    // const e_id = new Date().getTime()%100000000;

    adduser_details = 
    'insert into railways.users (sid, firstname, lastname,role,scd,  password, oname) values ('
    + '\'' + newsid + '\','
    + '\'' + first + '\','
    + '\'' + last + '\','
    + '\'' + role + '\','
    + '\'' + scd + '\','
    + '\'' + pswd + '\','
    + '\'' + oname + '\''
    +')';

    connect.query(adduser_details, function(err){
        if(err){
            return res.status(400).json({
                message: "Error Occured"
            })
        } else {
            return res.status(200).json({
                message: "Added User Successfully"
            })
        }
    })
}

exports.addStaffUserController=(req, res) => {
    const {
        first,
        last,
        pswd,
        role,
        oname,
        newsid,
        scd
    } = req.body;
    // const e_id = new Date().getTime()%100000000;

    adduser_details = 
    'insert into railways.users (sid, firstname, lastname,role, scd,  password, oname) values ('
    + '\'' + newsid + '\','
    + '\'' + first + '\','
    + '\'' + last + '\','
    + '\'' + role + '\','
    + '\'' + scd + '\','
    + '\'' + pswd + '\','
    + '\'' + oname + '\''
    +')';

    connect.query(adduser_details, function(err){
        if(err){
            console.log(req);
            return res.status(400).json({
                message: "Error Occured"
            })
        } else {
            return res.status(200).json({
                message: "Added User Successfully"
            })
        }
    })
} 


exports.addAdminController = (req, res) => {
    const {
        first,
        last,
        pswd,
        role,
        oname,
        newsid,
        scd
    } = req.body;
    // const e_id = new Date().getTime()%100000000;

    adduser_details = 
    'insert into railways.users (sid, firstname, lastname,role,scd, password, oname) values ('
    + '\'' + newsid + '\','
    + '\'' + first + '\','
    + '\'' + last + '\','
    + '\'' + role + '\','
    + '\'' + scd + '\','
    + '\'' + pswd + '\','
    + '\'' + oname + '\''
    +')';

    connect.query(adduser_details, function(err){
        if(err){
            return res.status(400).json({
                message: "Error Occured"
            })
        } else {
            return res.status(200).json({
                message: "Added User Successfully"
            })
        }
    })
}