const { connect } = require('../config/db');
const upload = require('../helpers/upload');
const fs = require('fs');

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
            return res.status(200).json({
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
    upload(req, res, (err) =>{
        if(err){
            if(typeof err === 'string'){
                return res.status(500).json({
                    err: err
                })
            } else if(typeof err === 'object'){
                return res.status(500).json({
                    err: err.message
                })
            } else {
                return res.status(500).json({
                    err:'Something went wrong'
                })
            }
        }else{
            checkpicture_name = 'Select picture from ice.Employees where Email = \''+ req.body.email + '\'';
            updatepicture_name = 'Select Firstname, Surname, Email, Mobile, Type, Status, Picture from ice.Employees where Email = \''+ req.body.email + '\'';
            setprofilepic_name = 'Update ice.Employees set picture = \''+ req.file.filename +'\' where Email = \'' + req.body.email + '\' ';
            connect.query(checkpicture_name, function(err, result){
                if(result.length === 1){
                    if(result[0].picture){
                        fs.unlinkSync(`uploads/userPics/${result[0].picture}`)
                    }

                    connect.query(setprofilepic_name, function(err, r){
                        if(r.affectedRows === 1){
                            connect.query(updatepicture_name, function(err, re){
                                if(re.length === 1){
                                    return res.status(200).json({
                                        message: "File Upload Successful",
                                        payload: re[0]
                                    })
                                } else {
                                    return res.status(500).json({
                                        message: "Error In File Upload"
                                    })
                                }
                            })
                        } else {
                            fs.unlinkSync(`uploads/userPics/${req.file.filename}`)
                            return res.status(500).json({
                                message: "Error In File Upload"
                            })
                        }
                    })
                } else{
                    return res.status(500).json({
                        err: "File Upload Failed"
                    })
                }  
            })
        }
    })
}