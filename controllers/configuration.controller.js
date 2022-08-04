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
    fetch_employees = 'select firstname ,lastname ,scd ,role , sid from railways.users u inner join  railways.station s on s.scode= u.scd where (u.role=\'Supervisor\' OR u.role=\'Staff\') AND ( u.scd=\''+ scode  +'\' ) AND ( u.oname=\'' +oname +'\') ORDER BY u.role DESC';   
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
    fetch_employees = 'select firstname,lastname,sname, role ,sid FROM railways.users, railways.station  where ( users.role=\'staff\') AND ( station.scode=\'' +scode +'\')AND( users.oname=\'' +oname +'\') ;'   
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
        toc, 
        scode,
        registerid,
        oname
    } = req.body;
    const gtotal = parseInt(cash) + parseInt(vouncher) + parseInt(ecash) + parseInt(ubi)+parseInt(pos)
    const totalTickets = parseInt(closingNo) - parseInt(commencingNo) +parseInt("1")
    const partroll= parseInt(closingNo)
    add_registers = `insert into railways.${tableName} (Date, shift, userid,login_time, commencing_number, closing_number, logout_time, ITC, NI, CAN, SPCAN, total_ticket, Number_of_pass, CASH, Vouncher, POS, Ecash, UPI_PAYMENT, Gtotal, Partroll_ending_number, HOC,TOC, oname, registerid, scode) values ('${date}', '${shift}', '${userid}', '${loginTime}', '${commencingNo}', '${closingNo}', '${logoutTime}', '${itc}', '${ni}', '${can}', '${sp}', '${totalTickets}', '${noofpass}', '${cash}', '${vouncher}', '${pos}', '${ecash}', '${ubi}', '${gtotal}', '${partroll}','${userid}',  '${toc? toc : null }', '${oname}', '${registerid}', '${scode}')`   

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
        time,
        userid,
        tktno,
        commencingmismatch,
        noofjumped,
        mismatchqty,
        reasonofmismatch,
        scode,
        registerid
    } = req.body;
   
    add_registers = `insert into railways.${tableName} (Date, ID,Time,Tkt_No,Commencing_No_of_Mismatch,No_of_tkt_removed_jumped,Mismatch_Qty,Reason_of_Mismatch,oname, registerid, scode) values ('${date}', '${userid}','${time}', '${tktno}', '${commencingmismatch}', '${noofjumped}', '${mismatchqty}', '${reasonofmismatch}',   '${oname}', '${registerid}', '${scode}')`   

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
exports.addCrpRegisters=(req,res)=>{
    const { 
        tableName,
		slno,
        dog,
        oname, 
        cash,
		vchs,
		dor,
		amt,
		hcl,
		sbi,
		rly,
		rad,
		crnote,
        dod,
        ack,
        scode,
        registerid
    } = req.body;
   
    add_registers = `insert into railways.${tableName} (sl_no,date_of_cash_gen,cash,vchs,date_of_remitance,amount_remitance,hcl_no,sbi_challan,cash_rly,cash_rad,cr_note,date_of_dispatch,cr_note_ack,oname, registerid, scode) values ( '${slno}','${dog}', '${cash}', '${vchs}', '${dor}', '${amt}', '${hcl}', '${sbi}', '${rly}','${rad}','${crnote}','${dod}','${ack}', '${oname}', '${registerid}', '${scode}')`   

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


exports.addMvrRegisters=(req,res)=>{
    const { 
        tableName,
		slno,
        frm,
        oname, 
        too,
		commencingdate,
		issue,
		closingdate,
        scode,
        registerid
    } = req.body;
   
    add_registers = `insert into railways.${tableName} (sl_no,frm,too,commencing_date,issue_to,closing_date,oname, registerid, scode) values ( '${slno}','${frm}', '${too}', '${commencingdate}', '${issue}', '${closingdate}',  '${oname}', '${registerid}', '${scode}')`   

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

exports.addTrrRegisters=(req,res)=>{
    const { 
        tableName,
		slno,
        oname, 
        rollno,
        commencingnumber,
        closingnumber,
        counterno,
        date,
        user,
        supervisorid,
        scode,
        registerid
    } = req.body;
   
    add_registers = `insert into railways.${tableName} (sl_no,rollno,commencing_number,closing_number,counter_no,date,userid,supervisor_id,oname, registerid, scode) values ( '${slno}','${rollno}', '${commencingnumber}', '${closingnumber}', '${counterno}', '${date}','${user}', '${supervisorid}',  '${oname}', '${registerid}', '${scode}')`   

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
exports.addAtvmRegisters=(req,res)=>{
    const { 
        tableName,
		slno,
        oname, 
        rollno,
        commencingnumber,
        closingnumber,
        counterno,
        date,
        user,
        supervisorid,
        scode,
        registerid
    } = req.body;
   
    add_registers = `insert into railways.${tableName} (sl_no,rollno,commencing_number,closing_number,counter_no,date,userid,supervisor_id,oname, registerid, scode) values ( '${slno}','${rollno}', '${commencingnumber}', '${closingnumber}', '${counterno}', '${date}','${user}', '${supervisorid}',  '${oname}', '${registerid}', '${scode}')`   

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
exports.addGbrRegisters=(req,res)=>{
    const { 
        tableName,
		slno,
        oname, 
        frm,
        too,
        dates,
        address,
        trainno,
        doj,
        noofpass,
        classs,
        purpose,
        authority,
        scode,
        registerid
    } = req.body;
   
    add_registers = `insert into railways.${tableName} (sl_no,date,address,trainno,date_of_journey,frm,too,noofpass,class_of_journey,journey_purpose,authority,oname, registerid, scode) values ( '${slno}','${dates}', '${address}', '${trainno}', '${doj}', '${frm}','${too}', '${noofpass}','${classs}','${purpose}','${authority}',  '${oname}', '${registerid}', '${scode}')`   

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
exports.addEarRegisters=(req,res)=>{
    const { 
        tableName,
		slno,
        oname, 
        errorsheetno,
        totalamount,
        specialcredit,
        amountpaid,
        nameofstaff,
        moneyreceipt,
        date,
        remarks,
        scode,
        registerid
    } = req.body;
   
    add_registers = `insert into railways.${tableName} (sl_no,error_sheet_no,total_amount,special_credit,amount_paid,name_of_staff,money_receipt,date,remarks,oname, registerid, scode) values ( '${slno}','${errorsheetno}', '${totalamount}', '${specialcredit}', '${amountpaid}', '${nameofstaff}','${moneyreceipt}', '${date}', '${remarks}', '${oname}', '${registerid}', '${scode}')`   

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

exports.registerPcdDeleteController = (req, res) => {

    const { pcdid, tableName } = req.body;
    register_delete = `delete from railways.${tableName} where pcdid='${pcdid}'`;
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
exports.registerGbrDeleteController = (req, res) => {

    const { gbrid, tableName } = req.body;
    register_delete = `delete from railways.${tableName} where gbrid='${gbrid}'`;
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
exports.registerNitDeleteController = (req, res) => {

    const { nitid, tableName } = req.body;
    register_delete = `delete from railways.${tableName} where nitid='${nitid}'`;
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

exports.registerSctDeleteController = (req, res) => {

    const { sctid, tableName } = req.body;
    register_delete = `delete from railways.${tableName} where sctid='${sctid}'`;
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

exports.registerMmrDeleteController = (req, res) => {

    const { mmrid, tableName } = req.body;
    register_delete = `delete from railways.${tableName} where mmrid='${mmrid}'`;
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

exports.registerFrDeleteController = (req, res) => {

    const { frid, tableName } = req.body;
    register_delete = `delete from railways.${tableName} where frid='${frid}'`;
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

exports.registerTsiDeleteController = (req, res) => {

    const { tsiid, tableName } = req.body;
    register_delete = `delete from railways.${tableName} where tsiid='${tsiid}'`;
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
exports.registerBbrDeleteController = (req, res) => {

    const { bbrid, tableName } = req.body;
    register_delete = `delete from railways.${tableName} where bbrid='${bbrid}'`;
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
exports.registerCrpDeleteController = (req, res) => {

    const { crpid, tableName } = req.body;
    register_delete = `delete from railways.${tableName} where crpid='${crpid}'`;
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
exports.registerMvrDeleteController = (req, res) => {

    const { mvrid, tableName } = req.body;
    register_delete = `delete from railways.${tableName} where mvrid='${mvrid}'`;
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
exports.registerTrrDeleteController = (req, res) => {

    const { trrid, tableName } = req.body;
    register_delete = `delete from railways.${tableName} where trrid='${trrid}'`;
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
exports.registerAtvmDeleteController = (req, res) => {

    const { atvmid, tableName } = req.body;
    register_delete = `delete from railways.${tableName} where atvmid='${atvmid}'`;
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
exports.registerEarDeleteController = (req, res) => {

    const { earid, tableName } = req.body;
    register_delete = `delete from railways.${tableName} where earid='${earid}'`;
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
exports.registerNcrDeleteController = (req, res) => {

    const { ncrid, tableName } = req.body;
    register_delete = `delete from railways.${tableName} where ncrid='${ncrid}'`;
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

exports.registerWleDeleteController = (req, res) => {

    const { wleid, tableName } = req.body;
    register_delete = `delete from railways.${tableName} where wleid='${wleid}'`;
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

exports.editLogRegisters = (req, res) => {
    const { 
        tableName, 
        id,  
        shift, 
        commencingNo, 
        closingNo, 
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
        toc, 
        oname,
        scode
    } = req.body;
    const gtotal = parseInt(cash) + parseInt(vouncher) + parseInt(ecash) + parseInt(ubi)+parseInt(pos)
    const totalTickets = parseInt(closingNo) - parseInt(commencingNo) +parseInt("1")
    const partroll= parseInt(closingNo);

    update_registers = `update railways.${tableName} set shift = '${shift}', commencing_number = '${commencingNo}', closing_number = '${closingNo}', ITC = '${itc}', NI = '${ni}', CAN = '${can}', SPCAN = '${sp}', total_ticket = '${totalTickets}', Number_of_pass = '${noofpass}', CASH = '${cash}', Vouncher = '${vouncher}', POS = '${pos}', Ecash = '${ecash}', UPI_PAYMENT = '${ubi}', Gtotal = '${gtotal}', Partroll_ending_number = '${partroll}', TOC = '${toc}' where id = '${id}' and scode = '${scode}';`

    if(totalTickets > 500){
        return res.status(500).json({
            message: "Total tickets exceeding"

        })
    } else{
        connect.query(update_registers, function(err, result) {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Error in Adding registers"
    
                })
            }
            return res.status(200).json({
                message: "Updated registers!", 
                logs: result
            })
        })
    }
}