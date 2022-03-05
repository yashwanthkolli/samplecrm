const {connect} = require('../config/db');
const jwt = require('jsonwebtoken');

exports.loginController = (req, res) => {
    const { sid, password ,scode} = req.body;

    login_query = 'Select sid, firstname, lastname,role ,scd,oname from railways.users WHERE sid = \'' + sid + '\' and Password = \'' + password + '\' and scd=\'' + scode + '\'';
    connect.query(login_query, function(err, result){
        if(err){
            
            return res.status(500).json({
                message: "Error in process execution"
            })
        }
        else if(result.length === 1){
            // use jwt to encode the data returned.
            const token = jwt.sign({
                sid: result[0].sid,
                firstname: result[0].firstname
            }, process.env.JWT_TOKEN_SIGN, {
                expiresIn: '24h'
            })

            const payload_Encrypt = jwt.sign({
                payload: result[0]
            }, process.env.JWT_PAYLOAD_ENCRYPT_SIGN, {
                expiresIn: '24h'
            })

            return res.status(200).json({
                message: "Login Successful",
                token: token,
                payload: payload_Encrypt,
                response: 1
            })
        } else {
            console.log(sid, password ,scode)
            return res.status(200).json({
                response: 0
            })
        }
    })
}

exports.stationController=(req,res) =>{

    station_query='Select sname,scode from railways.station ';
    connect.query(station_query, function(err, result){
        if(err){
            console.error(err);
            return res.status(500).json({
                message: "Error in process execution"
            })
        }
        else{
            return res.status(200).json({
                 station: result
            })
        }
    })
}