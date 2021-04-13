const {connect} = require('../config/db');
const jwt = require('jsonwebtoken');

exports.loginController = (req, res) => {
    const { email, password } = req.body;

    login_query = 'Select Email, Firstname, Surname, Mobile, Status, Type from ice.Employees WHERE Email = \'' + email + '\' and Password = \'' + password + '\' ';
    connect.query(login_query, function(err, result){
        if(err){
            return res.status(500).json({
                message: "Error in process execution"
            })
        }
        else if(result.length === 1){
            // use jwt to encode the data returned.
            const token = jwt.sign({
                email: result[0].email,
                mobile: result[0].Mobile
            }, process.env.JWT_TOKEN_SIGN, {
                expiresIn: '24h'
            })

            return res.status(200).json({
                message: "Login Successful",
                token: token,
                payload: result[0],
                response: 1
            })
        } else {
            return res.status(200).json({
                response: 0
            })
        }
    })
}