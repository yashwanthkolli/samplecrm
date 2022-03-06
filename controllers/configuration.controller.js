const {connect} = require('../config/db');

exports.userDeleteController = (req, res) => {

    const { sid } = req.body;
    user_delete = 'delete from railways.users where sid=\'' + sid + '\'';
    connect.query(user_delete, function(err, result) {
        if (err) {
            return res.status(500).json({
                message: "Error in Deleting employee"
            })
        }
        return res.status(200).json({
            message: "Employee Deleted!"
        })
    })
}

exports.fetchAdminEmployees = (req, res) => {
    const { scode,oname } = req.body;
    fetch_employees = 'select firstname ,lastname ,scd ,role , sid from railways.users u inner join  railways.station s on s.scode= u.scd where (u.role=\'Supervisor\' OR u.role=\'Staff\') AND ( u.scd=\''+ scode  +'\' ) AND ( u.oname=\'' +oname +'\')';   
    // fetch_employees = 'SELECT CONCAT(Firstname, \' \', Surname) as Name, Employee_ID, Email, Mobile, Type, City FROM ice.employees WHERE Reporting =\'' + id + '\'';
    connect.query(fetch_employees, function(err, result) {
        if (err) {
            return res.status(500).json({
                message: "Error in Fetching employee"

            })
        }
        return res.status(200).json({
            message: "Fetched Employees!", 
            employees: result
        })
    })
}

exports.fetchSupervisorEmployees=(req,res)=>{
    const {scode,oname}=req.body;
    fetch_employees = 'select firstname,lastname,email,sname, role ,mobile,sid FROM railways.users, railways.station  where ( users.role=\'staff\') AND ( station.scode=\'' +scode +'\')AND( users.oname=\'' +oname +'\') ;'   
    // fetch_employees = 'SELECT CONCAT(Firstname, \' \', Surname) as Name, Employee_ID, Email, Mobile, Type, City FROM ice.employees WHERE Reporting =\'' + id + '\'';
    connect.query(fetch_employees, function(err, result) {
        if (err) {
            return res.status(500).json({
                message: "Error in Fetching employee"

            })
        }
        return res.status(200).json({
            message: "Fetched Employees!", 
            employees: result
        })
    })

}

exports.fetchRegistersList=(req,res)=>{
    const {oname}=req.body;
    fetch_registers = 'select regid, regname, tablename FROM railways.registers where oname=\'' +oname +'\' ;'   

    connect.query(fetch_registers, function(err, result) {
        if (err) {
            return res.status(500).json({
                message: "Error in Fetching registers"

            })
        }
        return res.status(200).json({
            message: "Fetched Registers!", 
            registers: result
        })
    })

}

exports.fetchRegistersLogs=(req,res)=>{
    const {oname, regid, scode, tablename}=req.body;
    fetch_logs = 'select * FROM railways.' + tablename + ' where oname=\'' +oname +'\' and registerid=\'' + regid + '\' and scode=\'' + scode + '\' ;'
    if(!tablename) {
        return res.status(200).json({
            message: "Fetched Registers!",
            logs: []
        })
    } else {
        connect.query(fetch_logs, function(err, result) {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Error in Fetching registers"
    
                })
            }
            return res.status(200).json({
                message: "Fetched Registers!", 
                logs: result
            })
        })
    }

}

exports.fetchStaffLogs=(req,res)=>{
    const { userid }=req.body;
    fetch_logs = 'select * FROM railways.log where userid=\'' +userid +'\';'   

    connect.query(fetch_logs, function(err, result) {
        if (err) {
            console.log(err)
            return res.status(500).json({
                message: "Error in Fetching logs"

            })
        }
        return res.status(200).json({
            message: "Fetched logs!", 
            logs: result
        })
    })

}