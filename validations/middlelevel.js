const { connect } = require("../config/db");

exports.middleLevel = (req, res, next) => {
    const { sid } = req.body;

    checkType_query = 'Select firstname from railways.users where sid =  \''+ sid + '\' and ( role = \'Supervisor\' or role = \'Admin\' or role = \'Staff\' )';
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