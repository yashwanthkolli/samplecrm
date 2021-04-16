const { connect } = require('../config/db');

exports.latestLeadController = (req, res) => {

    countLeads_query = 'select count(*) as count from ice.status';
    connect.query(countLeads_query, function(err, result){
        if(err){
            return res.status(500).json({
                message: "Server error in fetching data"
            })
        }

        const countLeads = result[0].count - 5;
        latestLeads_query = 'select name from ice.status where name not in (select name from ice.status limit'+ countLeads + ')';
        connect.query(latestLeads_query, function(err, result){
            if(err){
                return res.status(500).json({
                    message: "Server error in fetching data"
                })
            }
            return res.status(200).json({
                message:"Fetched data",
                latest: result[0]
            })
        })
    })
}