const { connect } = require('../config/db');

exports.latestLeadController = (req, res) => {

    countLeads_query = 'select count(*) as count from ice.leads';
    connect.query(countLeads_query, function(err, result){
        if(err){
            return res.status(500).json({
                message: "Server error in fetching data"
            })
        }

        if(result[0].count <= 20){
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

exports.addNewLeadsController = (req, res) => {
    
    const {
        name,
        email_lead,
        mobile, city, source, status, qualif, course, comment, assignTo, email, ad_name
    } = req.body;
    const now = new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().split(' ')[0]

    addnewlead_query = 'insert into ice.leads (Name, Email, Mobile, Qualif, Source, Ad_Name, Course, City, AssignedTo, Status, CreatedBy, Createdt, AssignDt, Comment) values ('
        + ' \''+ name +'\' ,'
        + ' \''+ email_lead +'\' ,'
        + ' \''+ mobile +'\' ,'
        + ' \''+ qualif +'\' ,'
        + ' \''+ source +'\' ,'
        + ' \''+ ad_name +'\' ,'
        + ' \''+ course +'\' ,'
        + ' \''+ city +'\' ,'
        + ' \''+ assignTo +'\' ,'
        + '\''+ status +'\','
        + ' \''+ email +'\' ,'
        + ' \''+ now +'\' ,'
        + ' \''+ now +'\' ,'
        + ' \''+ comment + '\')';
    connect.query(addnewlead_query, function(err){
        console.log(err);
        if(err){
            return res.status(500).json({
                err: err 
            })
        } else {
            return res.status(200).json({
                message: "Created Leads Successfully"
            })
        }
    })
}