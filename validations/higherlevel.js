const { connect } = require("../config/db");

exports.verifyHigherLevel = (req, res, next) => {
    const { email } = req.body;

    checkType_query = 'Select Firstname from ice.Employees where Email =  \''+ email + '\' and ( Type = \'admin\' or Type = \'nHead\' )';
    connect.query(checkType_query, function(err, result){
        if(result.length === 1){
            next()
        } else {
            return res.status(401).json({
                message: "Unauthorized Access"
            })
        }
    })
}