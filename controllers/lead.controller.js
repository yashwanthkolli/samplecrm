const { connect } = require('../config/db');

exports.latestLeadController = (req, res) => {

    countLeads_query = 'select count(*) as count from ice.leads';
    connect.query(countLeads_query, function(err, result){
        if(err){
            return res.status(500).json({
                message: "Server error in fetching data"
            })
        }

        if(result[0] <= 20){
            leads_query = 'select * from ice.leads';
            connect.query(leads_query, function(err, r){
                if(err){
                    return res.status(500).json({
                        message: "Error in fetching the data"
                    })
                }
                return res.status(200).json({
                    message: "Data fetched",
                    latest: r[0]
                })
            })
        } else {
            const countLeads = result[0].count - 5;
            latestLeads_query = 'select * from ice.leads where name not in (select name from ice.leads limit'+ countLeads + ')';
            connect.query(latestLeads_query, function(err, re){
                if(err){
                    return res.status(500).json({
                        message: "Server error in fetching data"
                    })
                }
                return res.status(200).json({
                    message:"Fetched data",
                    latest: re[0]
                })
            })
        }
    })
}