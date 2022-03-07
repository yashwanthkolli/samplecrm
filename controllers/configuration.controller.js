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

exports.addRegisters=(req,res)=>{
    const { 
        tableName, 
        date, 
        shift, 
        userid, 
        loginTime, 
        commencingNo, 
        closingNo, 
        logoutTime, 
        itc, 
        ni, 
        can, 
        sp, 
        noofpass, 
        cash, 
        vouncher, 
        pos, 
        ecash, 
        ubi,  
        partroll, 
        scode,
        registerid,
        oname
    } = req.body;
    const gtotal = parseInt(cash) + parseInt(vouncher) + parseInt(ecash) + parseInt(ubi)
    const totalTickets = parseInt(closingNo) - parseInt(commencingNo)
    add_registers = `insert into railways.${tableName} (Date, shift, userid,login_time, commencing_number, closing_number, logout_time, ITC, NI, CAN, SPCAN, total_ticket, Number_of_pass, CASH, Vouncher, POS, Ecash, UPI_PAYMENT, Gtotal, Partroll_ending_number, HOC, oname, registerid, scode) values ('${date}', '${shift}', '${userid}', '${loginTime}', '${commencingNo}', '${closingNo}', '${logoutTime}', '${itc}', '${ni}', '${can}', '${sp}', '${totalTickets}', '${noofpass}', '${cash}', '${vouncher}', '${pos}', '${ecash}', '${ubi}', '${gtotal}', '${partroll}', '${userid}', '${oname}', '${registerid}', '${scode}')`   

    if(totalTickets > 500){
        return res.status(500).json({
            message: "Total tickets exceeding"

        })
    } else{
        connect.query(add_registers, function(err, result) {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Error in Adding registers"
    
                })
            }
            return res.status(200).json({
                message: "Added registers!", 
                logs: result
            })
        })
    }
}

exports.addPcdRegisters=(req,res)=>{
    const { 
        tableName, 
        date, 
        userid, 
        name, 
        design, 
        shift, 
        figures, 
        words, 
        twot, 
        fiveh,
        twoh, 
        oneh, 
        fifty,
        scode,
        registerid,
        oname
    } = req.body;
   
    add_registers = `insert into railways.${tableName} (Date, stid,sname,design,Shift,Figures,Words,TWOT,FIVEH,TWOH,ONEH,FIFTY, oname, registerid, scode) values ('${date}', '${userid}', '${name}', '${design}', '${shift}', '${figures}', '${words}', '${twot}', '${fiveh}', '${twoh}', '${oneh}', '${fifty}',  '${oname}', '${registerid}', '${scode}')`   

    connect.query(add_registers, function(err, result) {
        if (err) {
            console.log(err)
            return res.status(500).json({
                message: "Error in Adding registers"

            })
        }
        return res.status(200).json({
            message: "Added registers!", 
            logs: result
        })
    })
}

exports.addNitRegisters=(req,res)=>{
    const { 
        tableName,
        date,
        oname, 
        userid,
        pnr,
        nitkt,
        newtkt,
        tostn,
        fare,
        cis,
        ad,
        ch,
        reason,
        nxtfare,
        scode,
        registerid
    } = req.body;
   
    add_registers = `insert into railways.${tableName} (Date, ID,PNR,NI_tkt_no,New_tkt,To_station,Fare,CIs,AD,CH,Reason_for_NI,Next_tkt_Fare ,oname, registerid, scode) values ('${date}', '${userid}', '${pnr}', '${nitkt}', '${newtkt}', '${tostn}', '${fare}', '${cis}', '${ad}', '${ch}', '${reason}', '${nxtfare}',  '${oname}', '${registerid}', '${scode}')`   

    connect.query(add_registers, function(err, result) {
        if (err) {
            console.log(err)
            return res.status(500).json({
                message: "Error in Adding registers"

            })
        }
        return res.status(200).json({
            message: "Added registers!", 
            logs: result
        })
    })
}


exports.addMmrRegisters=(req,res)=>{
    const { 
        tableName,
        date,
        oname,
        Time,
        userid,
        tktno,
        commencingmismatch,
        noofjumped,
        mismatchqty,
        reasonofmismatch,
        scode,
        registerid
    } = req.body;
   
    add_registers = `insert into railways.${tableName} (Date, ID,Time,Tkt_No,Commencing_No_of_Mismatch,No_of_tkt_removed_jumped,Mismatch_Qty,Reason_of_Mismatch,oname, registerid, scode) values ('${date}', '${userid}','${Time}', '${tktno}', '${commencingmismatch}', '${noofjumped}', '${mismatchqty}', '${reasonofmismatch}',   '${oname}', '${registerid}', '${scode}')`   

    connect.query(add_registers, function(err, result) {
        if (err) {
            console.log(err)
            return res.status(500).json({
                message: "Error in Adding registers"

            })
        }
        return res.status(200).json({
            message: "Added registers!", 
            logs: result
        })
    })
}

exports.addTsiRegisters=(req,res)=>{
    const { 
        tableName,
        oname,
        userid,
        rollno,
        commencingno,
        closingno,
        insertiondate,
        onhandrollno,
        scode,
        registerid
    } = req.body;
   
    add_registers = `insert into railways.${tableName} ( ID,Roll_No,commencing_number,closing_number,Insertion_date,On_hand_Rolls,oname, registerid, scode) values ( '${userid}',  '${rollno}', '${commencingno}', '${closingno}', '${insertiondate}', '${onhandrollno}' , '${oname}', '${registerid}', '${scode}')`   

    connect.query(add_registers, function(err, result) {
        if (err) {
            console.log(err)
            return res.status(500).json({
                message: "Error in Adding registers"

            })
        }
        return res.status(200).json({
            message: "Added registers!", 
            logs: result
        })
    })
}


exports.addNcrRegisters=(req,res)=>{
    const { 
        tableName,
        date,
        oname,
        userid,
        slno,
        permissionno,
        pnrno,
        originalname,
        changename,
        scode,
        registerid
    } = req.body;
   
    add_registers = `insert into railways.${tableName} (Date, ID,sl_no,Permission_authority_No,PNR_No,Original_Name_of_passenger,Change_Name_of_passenger,oname, registerid, scode) values ('${date}', '${userid}', '${slno}', '${permissionno}', '${pnrno}', '${originalname}', '${changename}',  '${oname}', '${registerid}', '${scode}')`   

    connect.query(add_registers, function(err, result) {
        if (err) {
            console.log(err)
            return res.status(500).json({
                message: "Error in Adding registers"

            })
        }
        return res.status(200).json({
            message: "Added registers!", 
            logs: result
        })
    })
}


exports.addWleRegisters=(req,res)=>{
    const { 
        tableName,
        date,
        oname,
        slno,
        trainno,
        journeydate,
        classno,
        watinglistno,
        authoritytno,
        scode,
        registerid
    } = req.body;
   
    add_registers = `insert into railways.${tableName} (Date, sl_no,Train_No,Journey_Date,Class,Waiting_List_Extended_No,Authority_No,oname, registerid, scode) values ('${date}',  '${slno}', '${trainno}', '${journeydate}', '${classno}', '${watinglistno}',  '${authoritytno}', '${oname}', '${registerid}', '${scode}')`   

    connect.query(add_registers, function(err, result) {
        if (err) {
            console.log(err)
            return res.status(500).json({
                message: "Error in Adding registers"

            })
        }
        return res.status(200).json({
            message: "Added registers!", 
            logs: result
        })
    })
}

exports.addSctRegisters=(req,res)=>{
    const { 
        tableName,
        date,
        oname, 
        userid,
        pnr,
        spcantkt,
        tostn,
        fare,
        cis,
        ad,
        ch,
        reason,
		freshtkt,
        nxtfare,
        scode,
        registerid
    } = req.body;
   
    add_registers = `insert into railways.${tableName} (Date, ID,PNR,Sp_Can_tkt_no,To_station,Fare,CIs,AD,CH,Reason_for_Sp_Can,Fresh_tkt,Sp_Can_Fare ,oname, registerid, scode) values ('${date}', '${userid}', '${pnr}', '${spcantkt}', '${tostn}', '${fare}', '${cis}', '${ad}', '${ch}', '${reason}','${freshtkt}', '${nxtfare}',  '${oname}', '${registerid}', '${scode}')`   

    connect.query(add_registers, function(err, result) {
        if (err) {
            console.log(err)
            return res.status(500).json({
                message: "Error in Adding registers"

            })
        }
        return res.status(200).json({
            message: "Added registers!", 
            logs: result
        })
    })
}


exports.addFrRegisters=(req,res)=>{
    const { 
        tableName,
        oname, 
        userid,
        fdate,
		ftime,
		repdate,
		reptime,
		recdate,
		rectime,
		fdetails,
		rto,
		rby,
        scode,
        registerid
    } = req.body;
   
    add_registers = `insert into railways.${tableName} ( ID,Failure_Date,Failure_time,Reporting_Date,Reporting_time,Rectification_Date,Rectification_time,failure_details,Reported_to,Rectifited_by,oname, registerid, scode) values ('${userid}', '${fdate}', '${ftime}', '${repdate}', '${reptime}', '${recdate}', '${rectime}', '${fdetails}', '${rto}','${rby}', '${oname}', '${registerid}', '${scode}')`   

    connect.query(add_registers, function(err, result) {
        if (err) {
            console.log(err)
            return res.status(500).json({
                message: "Error in Adding registers"

            })
        }
        return res.status(200).json({
            message: "Added registers!", 
            logs: result
        })
    })
}


exports.addBbrRegisters=(req,res)=>{
    const { 
        tableName,
		slno,
        date,
        oname, 
        party,
		pauth,
		tno,
		doj,
		frm,
		to,
		permit,
		booked,
		rov,
        scode,
        registerid
    } = req.body;
   
    add_registers = `insert into railways.${tableName} (Date,sl_no,Party_name_and_address,Permission_authority_No,Train_No,Date_of_Journey,From_a,To_a,No_of_pass_permit,No_of_pass_Booked,Reason_for_variation,oname, registerid, scode) values ( '${date}','${slno}', '${party}', '${pauth}', '${tno}', '${doj}', '${frm}', '${to}', '${permit}','${booked}','${rov}', '${oname}', '${registerid}', '${scode}')`   

    connect.query(add_registers, function(err, result) {
        if (err) {
            console.log(err)
            return res.status(500).json({
                message: "Error in Adding registers"

            })
        }
        return res.status(200).json({
            message: "Added registers!", 
            logs: result
        })
    })
}

exports.registerDeleteController = (req, res) => {

    const { id, tableName } = req.body;
    register_delete = `delete from railways.${tableName} where id='${id}'`;
    connect.query(register_delete, function(err, result) {
        if (err) {
            return res.status(500).json({
                message: "Error in Deleting register"
            })
        }
        return res.status(200).json({
            message: "Register Deleted!"
        })
    })
}