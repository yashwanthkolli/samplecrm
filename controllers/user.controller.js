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

exports.userListController = (req, res) => {
    
    getlist_query = 'Select Firstname, Surname, Email, Mobile, City, Type, Status, Reporting from ice.Employees';
    connect.query(getlist_query, function(err, result){
        if(err){
            return res.status(500).json({
                message: "Fetching User Details Failed"
            })
        }

        return res.status(200).json({
            message : "User Details Fetched",
            details: result
        })
    })
}

exports.addUserController = (req, res) => {
    const {
        first,
        sur,
        new_email,
        pswd,
        mobile,
        address,
        dob,
        city,
        role,
        reporting
    } = req.body;
    const e_id = new Date().getTime()%100000000;

    adduser_details = 
    'insert into ice.Employees (Employee_ID, Firstname, Surname, Email, Mobile, Password, DOB, Address, City, Type, Reporting) values ('
    + '\'' + e_id + '\','
    + '\'' + first + '\','
    + '\'' + sur + '\','
    + '\'' + new_email + '\','
    + '\'' + mobile + '\','
    + '\'' + pswd + '\','
    + '\'' + dob + '\','
    + '\'' + address + '\','
    + '\'' + city + '\','
    + '\'' + role + '\','
    + '\'' + reporting + '\''
    +')';

    connect.query(adduser_details, function(err){
        if(err){
            return res.status(400).json({
                message: "Error Occured"
            })
        } else {
            return res.status(200).json({
                message: "Added User Successfully"
            })
        }
    })
}

exports.employeeAssignedController = (req, res) => {

    employee_query = 'select Firstname, Surname, Employee_ID, email from ice.employees';
    connect.query(employee_query, function(err, result){
        if(err){
            return res.status(500).json({
                message: "Error in fetching employee details"
            })
        }
        return res.status(200).json({
            message: "Details Fetch Successfull",
            employees: result
        })
    })
}

exports.getLoginTimeController = (req, res) => {

    const { prevEmail } = req.body
    getTime_query = 'SELECT Timings FROM ice.employees WHERE Email = \'' + prevEmail + '\'';
    connect.query(getTime_query, function(err, result){
        if(err){
            return res.status(500).json({
                message: "Error in fetching timings"
            })
        }
        return res.status(200).json({
            message: "Timings Fetch Successfull",
            timings: result
        })
    })
}

exports.setLoginTimeController = (req, res) => {
    const { jsonData, prevEmail } = req.body
    setTime_querry = 'UPDATE ice.employees SET Timings = \'' + JSON.stringify(jsonData) + '\' WHERE Email = \'' + prevEmail + '\'';
    connect.query(setTime_querry, function(err, result){
        if(err){
            return res.status(500).json({
                message: "Error in updating timings"
            })
        }
        return res.status(200).json({
            message: "Timings Updated Successfull"
        })
    })
}

exports.getCityNamesController = (req, res) => {

    getCityQuery = 'select * from ice.city';
    connect.query(getCityQuery, function(err, result){
        if(err){
            return res.status(500).json({
                message: "Error in fetching cities"
            })
        }

        return res.status(200).json({
            message: "Fetched Cities Successfully",
            city: result
        })
    })
}

exports.telecallerListController = (req, res) => {

    telecallerQuery = 'select * from ice.employees where Type = \'TeleCaller\' ';
    connect.query(telecallerQuery, function(err, result){
        if(err){
            return res.status(500).json({
                message: "Error in fetching telecaller list"
            })
        }

        return res.status(200).json({
            message: "Fetched Telecaller List",
            employees: result
        })
    })
}