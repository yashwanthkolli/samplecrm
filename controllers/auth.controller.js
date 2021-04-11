const {connect} = require('../config/db');

exports.loginController = (req, res) => {
    const { email, password } = req.body;

    login_query = 'Select Email, Firstname, Surname, Mobile, Status, Type from ice.Employees WHERE Email = \'' + email + '\' and Password = \'' + password + '\' ';
    connect.query(login_query, function(err, result){
        if(err){
            console.log(err);
        }
        else if(result){
            console.log(result);
        } else {

        }
    })
}