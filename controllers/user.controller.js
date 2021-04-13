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
                    ["Adress", result[0].Address],
                    ["City", result[0].City],
                    ["DOB", result[0].DOB]
                ]
            })
        } else {
            return res.status(500).json({
                message: "Error in fetching details"
            })
        }
    })
}