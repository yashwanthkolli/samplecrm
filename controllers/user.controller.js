const { connect } = require('../config/db');

exports.detailsController = (req, res) => {
    const { email } = req.body;
    
    details_query = 'Select * from ice.Employees Where Email = \'' + email + '\'';
    connect.query(details_query, function(err, result){
        if(err){
            return res.status(500).json({
                message: "Error Occured"
            })
        } else if(result.length === 1){
            return res.status(200).json({
                details: [
                    ["Address", result[0].Address],
                    ["City", result[0].City],
                    ["Date Of Birth", new Date(result[0].DOB).toDateString()]
                ]
            })
        } else {
            return res.status(500).json({
                message: "Error in fetching details"
            })
        }
    })
}

exports.changePasswordController = (req, res) => {
    const { email, current, newP} = req.body;

    change_password_query = 'Update ice.Employees set password = \'' + newP + '\' where Email = \'' + email + '\' and Password = \'' + current + '\'';
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

exports.uploadDisplayController = (req, res) => {

}