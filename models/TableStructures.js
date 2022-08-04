module.exports = [
    [
        'Station',
        'scode VARCHAR(255) NOT NULL,Primary key(scode),'
        +'sname VARCHAR(255) NOT NULL'
    ],
    [
        'users',
        'sid VARCHAR(255) NOT NULL,Primary key(sid),'
        +'firstname VARCHAR(255) NOT NULL,'
        +'lastname VARCHAR(255),'
        +'password VARCHAR(255) NOT NULL,'
        +'role VARCHAR(255) NOT NULL,'
        +'scd  VARCHAR(255) NOT NULL,'
        +'FOREIGN KEY (scd) REFERENCES station(scode),'
        +'oname VARCHAR(255) '

    ],
    [
        'office',
        'oid VARCHAR(255) NOT NULL,Primary key(oid),'
        +'oname VARCHAR(255) NOT NULL,'
        +'scd VARCHAR(255) NOT NULL,'
        +'FOREIGN KEY (scd) REFERENCES station(scode)'
    ],
    [
        'registers',
        'regid VARCHAR (255) NOT NULL,Primary key(regid),'
        +'regname VARCHAR (255) NOT NULL,'
        +'oname VARCHAR (255) NOT NULL,'
        +'tablename VARCHAR(255) NOT NULL'
        

    ],
    [
        'Log',
        'id int NOT NULL AUTO_INCREMENT,'
        +'PRIMARY KEY (id),'
         +'Date VARCHAR(255) NOT NULL,'
         +'shift INT,'
         +'userid VARCHAR(255) NOT NULL,'
         +'login_time VARCHAR(255) NOT NULL,'
         +'commencing_number INT,'
         +'closing_number INT,'
         +'logout_time VARCHAR(255) NOT NULL ,'
         +'ITC INT,'
         +'NI INT,'
         +'CAN INT,'
         +'SPCAN INT,'
         +'total_ticket INT,'
         +'Number_of_pass INT,'
         +'CASH INT,'
         +'Vouncher INT,'
         +'POS VARCHAR(255) NOT NULL,'
         +'Ecash INT,'
         +'UPI_PAYMENT INT,'
         +'Gtotal INT,'
         +'Partroll_ending_number INT,'
         +'HOC VARCHAR(255) NOT NULL,'
         +'TOC VARCHAR(255),'
         +'FOREIGN KEY (Userid) REFERENCES users(sid),'
         +'FOREIGN KEY (HOC) REFERENCES users(sid),'
         +'oname VARCHAR(255) NOT NULL,'
         +'FOREIGN KEY (registerid) REFERENCES Registers(regid),'
         +'registerid VARCHAR(255) NOT NULL,'
         +'scode VARCHAR(255) NOT NULL,'
         +'FOREIGN KEY (scode) REFERENCES Station(scode)'

    ],
    [
        'PCD',
        'pcdid INT NOT NULL AUTO_INCREMENT,'
        +'PRIMARY KEY (pcdid),'
        +'Date VARCHAR(255) NOT NULL,'
        +'stid VARCHAR(255) NOT NULL,'
        +'sname VARCHAR(255) NOT NULL,'
        +'design VARCHAR(255) NOT NULL,'
        +'Shift INT,'
        +'Figures INT,'
        +'Words VARCHAR(255) NOT NULL,'
        +'TWOT INT,'
        +'FIVEH INT,'
        +'TWOH INT,'
        +'ONEH INT,'
        +'FIFTY INT,'
        +'FOREIGN KEY (stid) REFERENCES users(sid),'
        +'oname VARCHAR(255) NOT NULL,'
        +'FOREIGN KEY (registerid) REFERENCES Registers(regid),'
        +'registerid VARCHAR(255) NOT NULL,'
        +'scode VARCHAR(255) NOT NULL,'
        +'FOREIGN KEY (scode) REFERENCES station(scode)'
    ],
    [
        'nit',
        'nitid INT NOT NULL AUTO_INCREMENT,'
        +'PRIMARY KEY (nitid),'
        +'Date VARCHAR(255) NOT NULL,'
        +'ID VARCHAR(255) NOT NULL,'
        +'PNR VARCHAR(255) NOT NULL,'
        +'NI_tkt_no VARCHAR(255) NOT NULL,'
        +'New_tkt VARCHAR(255) NOT NULL,'
        +'To_station VARCHAR(255) NOT NULL,'
        +'Fare VARCHAR(255) NOT NULL,'
        +'CIs VARCHAR(255) NOT NULL,'
        +'AD VARCHAR(255) NOT NULL,'
        +'CH VARCHAR(255) NOT NULL,'
        +'Reason_for_NI VARCHAR(255) NOT NULL,'
        +'Next_tkt_Fare VARCHAR(255) NOT NULL,'
        +'FOREIGN KEY (ID) REFERENCES users(sid),'
        +'oname VARCHAR(255) NOT NULL,'
        +'FOREIGN KEY (registerid) REFERENCES Registers(regid),'
        +'registerid VARCHAR(255) NOT NULL,'
        +'scode VARCHAR(255) NOT NULL,'
        +'FOREIGN KEY (scode) REFERENCES station(scode)'
    ],
    [
        'sct',
        'sctid INT NOT NULL AUTO_INCREMENT,'
        +'PRIMARY KEY (sctid),'
        +'Date VARCHAR(255) NOT NULL,'
        +'ID VARCHAR(255) NOT NULL,'
        +'PNR VARCHAR(255) NOT NULL,'
        +'Sp_Can_tkt_no VARCHAR(255) NOT NULL,'
        +'To_station VARCHAR(255) NOT NULL,'
        +'Fare VARCHAR(255) NOT NULL,'
        +'CIs VARCHAR(255) NOT NULL,'
        +'AD VARCHAR(255) NOT NULL,'
        +'CH VARCHAR(255) NOT NULL,'
        +'Reason_for_Sp_Can VARCHAR(255) NOT NULL,'
        +'Fresh_tkt VARCHAR(255) NOT NULL,'
        +'Sp_Can_Fare VARCHAR(255) NOT NULL,'
        +'FOREIGN KEY (ID) REFERENCES users(sid),'
        +'oname VARCHAR(255) NOT NULL,'
        +'FOREIGN KEY (registerid) REFERENCES Registers(regid),'
        +'registerid VARCHAR(255) NOT NULL,'
        +'scode VARCHAR(255) NOT NULL,'
        +'FOREIGN KEY (scode) REFERENCES station(scode)'
    ],
    [
        'mmr',
        'mmrid INT NOT NULL AUTO_INCREMENT,'
        +'PRIMARY KEY (mmrid),'
        +'Date VARCHAR(255) NOT NULL,'
        +'ID VARCHAR(255) NOT NULL,'
        +'Time VARCHAR(255) NOT NULL,'
        +'Tkt_No VARCHAR(255) NOT NULL,'
        +'Commencing_No_of_Mismatch VARCHAR(255) NOT NULL,'
        +'No_of_tkt_removed_jumped VARCHAR(255) NOT NULL,'
        +'Mismatch_Qty VARCHAR(255) NOT NULL,'
        +'Reason_of_Mismatch VARCHAR(255) NOT NULL,'
        +'FOREIGN KEY (ID) REFERENCES users(sid),'
        +'oname VARCHAR(255) NOT NULL,'
        +'FOREIGN KEY (registerid) REFERENCES Registers(regid),'
        +'registerid VARCHAR(255) NOT NULL,'
        +'scode VARCHAR(255) NOT NULL,'
        +'FOREIGN KEY (scode) REFERENCES station(scode)'
    ],
    [
        'fr',
        'frid INT NOT NULL AUTO_INCREMENT,'
        +'PRIMARY KEY (frid),'
        +'ID VARCHAR(255) NOT NULL,'
        +'Failure_Date VARCHAR(255) NOT NULL,'
        +'Failure_time VARCHAR(255) NOT NULL,'
        +'Reporting_Date VARCHAR(255) NOT NULL,'
        +'Reporting_time VARCHAR(255) NOT NULL,'
        +'Rectification_Date VARCHAR(255) NOT NULL,'
        +'Rectification_time VARCHAR(255) NOT NULL,'
        +'failure_details VARCHAR(255) NOT NULL,'
        +'Reported_to VARCHAR(255) NOT NULL,'
        +'Rectifited_by VARCHAR(255) NOT NULL,'
        +'FOREIGN KEY (ID) REFERENCES users(sid),'
        +'oname VARCHAR(255) NOT NULL,'
        +'FOREIGN KEY (registerid) REFERENCES Registers(regid),'
        +'registerid VARCHAR(255) NOT NULL,'
        +'scode VARCHAR(255) NOT NULL,'
        +'FOREIGN KEY (scode) REFERENCES station(scode)'
    ],
    [
        'tsi',
        'tsiid INT NOT NULL AUTO_INCREMENT,'
        +'PRIMARY KEY (tsiid),'
        +'Roll_No VARCHAR(255) NOT NULL,'
        +'commencing_number VARCHAR(255) NOT NULL,'
        +'closing_number VARCHAR(255) NOT NULL,'
        +'ID VARCHAR(255) NOT NULL,'
        +'Insertion_date VARCHAR(255) NOT NULL,'
        +'On_hand_Rolls VARCHAR(255) NOT NULL,'
        +'FOREIGN KEY (ID) REFERENCES users(sid),'
        +'oname VARCHAR(255) NOT NULL,'
        +'FOREIGN KEY (registerid) REFERENCES Registers(regid),'
        +'registerid VARCHAR(255) NOT NULL,'
        +'scode VARCHAR(255) NOT NULL,'
        +'FOREIGN KEY (scode) REFERENCES station(scode)'
    ],
    [
        'bbr',
        'bbrid INT NOT NULL AUTO_INCREMENT,'
        +'PRIMARY KEY (bbrid),'
        +'sl_no VARCHAR(255) NOT NULL,'
        +'Date VARCHAR(255) NOT NULL,'
        +'Party_name_and_address VARCHAR(255) NOT NULL,'
        +'Permission_authority_No VARCHAR(255) NOT NULL,'
        +'Train_No VARCHAR(255) NOT NULL,'
        +'Date_of_Journey VARCHAR(255) NOT NULL,'
        +'From_a VARCHAR(255) NOT NULL,'
        +'To_a VARCHAR(255) NOT NULL,'
        +'No_of_pass_permit VARCHAR(255) NOT NULL,'
        +'No_of_pass_Booked VARCHAR(255) NOT NULL,'
        +'Reason_for_variation VARCHAR(255) NOT NULL,'
        +'oname VARCHAR(255) NOT NULL,'
        +'FOREIGN KEY (registerid) REFERENCES Registers(regid),'
        +'registerid VARCHAR(255) NOT NULL,'
        +'scode VARCHAR(255) NOT NULL,'
        +'FOREIGN KEY (scode) REFERENCES station(scode)'

    ],
   [
       'ncr',
       'ncrid INT NOT NULL AUTO_INCREMENT,'
        +'PRIMARY KEY (ncrid),'
        +'sl_no VARCHAR(255) NOT NULL,'
        +'Date VARCHAR(255) NOT NULL,'
        +'Permission_authority_No VARCHAR(255) NOT NULL,'
        +'PNR_No VARCHAR(255) NOT NULL,'
        +' Original_Name_of_passenger VARCHAR(255) NOT NULL,'
        +'Change_Name_of_passenger VARCHAR(255) NOT NULL,'
        +'ID VARCHAR(255) NOT NULL,'
        +'FOREIGN KEY (ID) REFERENCES users(sid),'
        +'oname VARCHAR(255) NOT NULL,'
        +'FOREIGN KEY (registerid) REFERENCES Registers(regid),'
        +'registerid VARCHAR(255) NOT NULL,'
        +'scode VARCHAR(255) NOT NULL,'
        +'FOREIGN KEY (scode) REFERENCES station(scode)'

   ],
   [
       'wle',
       'wleid INT NOT NULL AUTO_INCREMENT,'
        +'PRIMARY KEY (wleid),'
        +'sl_no VARCHAR(255) NOT NULL,'
        +'Date VARCHAR(255) NOT NULL,'
        +'Train_No VARCHAR(255) NOT NULL,'
        +'Journey_Date VARCHAR(255) NOT NULL,'
        +'Class VARCHAR(255) NOT NULL,'
        +'Waiting_list_Extended_No VARCHAR(255) NOT NULL,'
        +'Authority_No VARCHAR(255) NOT NULL,'
        +'oname VARCHAR(255) NOT NULL,'
        +'FOREIGN KEY (registerid) REFERENCES Registers(regid),'
        +'registerid VARCHAR(255) NOT NULL,'
        +'scode VARCHAR(255) NOT NULL,'
        +'FOREIGN KEY (scode) REFERENCES station(scode)'


       
   ],
   [
       'crp',
       'crpid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
       +'sl_no VARCHAR(255) NOT NULL,'
       +'date_of_cash_gen VARCHAR(255) NOT NULL,'
       +'cash VARCHAR(255) NOT NULL,'
       +'vchs VARCHAR(255) NOT NULL,'
       +'date_of_remitance VARCHAR(255) NOT NULL,'
       +'amount_remitance VARCHAR(255) NOT NULL,'
       +'hcl_no VARCHAR(255) NOT NULL,'
       +'sbi_challan VARCHAR(255) NOT NULL,'
       +'cash_rly VARCHAR(255) NOT NULL,'
       +'cash_rad VARCHAR(255) NOT NULL,'
       +'cr_note VARCHAR(255) NOT NULL,'
       +'date_of_dispatch VARCHAR(255) NOT NULL,'
       +'cr_note_ack VARCHAR(255) NOT NULL,'
       +'oname VARCHAR(255) NOT NULL,'
       +'FOREIGN KEY (registerid) REFERENCES Registers(regid),'
       +'registerid VARCHAR(255) NOT NULL,'
       +'scode VARCHAR(255) NOT NULL,'
       +'FOREIGN KEY (scode) REFERENCES station(scode)'
   ],
   [
       'mvr',
       'mvrid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
       +'sl_no VARCHAR(255) NOT NULL,'
       +'frm VARCHAR(255) NOT NULL,'
       +'too VARCHAR(255) NOT NULL,'
       +'commencing_date VARCHAR(255) NOT NULL,'
       +'issue_to VARCHAR(255) NOT NULL,'
       +'closing_date VARCHAR(255) NOT NULL,'
       +'oname VARCHAR(255) NOT NULL,'
       +'FOREIGN KEY (registerid) REFERENCES Registers(regid),'
       +'registerid VARCHAR(255) NOT NULL,'
       +'scode VARCHAR(255) NOT NULL,'
       +'FOREIGN KEY (scode) REFERENCES station(scode)'
       
   ],
   [
       'trr',
       'trrid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
       +'sl_no VARCHAR(255) NOT NULL,'
       +'rollno VARCHAR(255) NOT NULL,'
       +'commencing_number VARCHAR(255) NOT NULL,'
       +'closing_number VARCHAR(255) NOT NULL,'
       +'counter_no VARCHAR(255) NOT NULL,'
       +'date VARCHAR(255) NOT NULL,'
       +'userid VARCHAR(255) NOT NULL,'
       +'supervisor_id VARCHAR(255) NOT NULL,'
       +'oname VARCHAR(255) NOT NULL,'
       +'FOREIGN KEY (registerid) REFERENCES Registers(regid),'
       +'registerid VARCHAR(255) NOT NULL,'
       +'scode VARCHAR(255) NOT NULL,'
       +'FOREIGN KEY (scode) REFERENCES station(scode)'
   ],
   [
       'atvm',
       'atvmid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
       +'sl_no VARCHAR(255) NOT NULL,'
       +'rollno VARCHAR(255) NOT NULL,'
       +'commencing_number VARCHAR(255) NOT NULL,'
       +'closing_number VARCHAR(255) NOT NULL,'
       +'counter_no VARCHAR(255) NOT NULL,'
       +'date VARCHAR(255) NOT NULL,'
       +'userid VARCHAR(255) NOT NULL,'
       +'supervisor_id VARCHAR(255) NOT NULL,'
       +'oname VARCHAR(255) NOT NULL,'
       +'FOREIGN KEY (registerid) REFERENCES Registers(regid),'
       +'registerid VARCHAR(255) NOT NULL,'
       +'scode VARCHAR(255) NOT NULL,'
       +'FOREIGN KEY (scode) REFERENCES station(scode)'
   ],
   [
       'ear',
       'earid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
       +'sl_no VARCHAR(255) NOT NULL,'
       +'error_sheet_no VARCHAR(255) NOT NULL,'
       +'total_amount VARCHAR(255) NOT NULL,'
       +'special_credit  VARCHAR(255) NOT NULL,'
       +'amount_paid VARCHAR(255) NOT NULL,'
       +'name_of_staff VARCHAR(255) NOT NULL,'
       +'money_receipt VARCHAR(255) NOT NULL,'
       +'date VARCHAR(255) NOT NULL,'
       +'remarks VARCHAR(255) NOT NULL,'
       +'oname VARCHAR(255) NOT NULL,'
       +'FOREIGN KEY (registerid) REFERENCES Registers(regid),'
       +'registerid VARCHAR(255) NOT NULL,'
       +'scode VARCHAR(255) NOT NULL,'
       +'FOREIGN KEY (scode) REFERENCES station(scode)'
   ],
   [
       'gbr',
       'gbrid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
       +'sl_no VARCHAR(255) NOT NULL,'
       +'date VARCHAR(255) NOT NULL,'
       +'address VARCHAR(255) NOT NULL,'
       +'trainno VARCHAR(255) NOT NULL,'
       +'date_of_journey VARCHAR(255) NOT NULL,'
       +'frm VARCHAR(255) NOT NULL,'
       +'too VARCHAR(255) NOT NULL,'
       +'noofpass VARCHAR(255) NOT NULL,'
       +'class_of_journey VARCHAR(255) NOT NULL,'
       +'journey_purpose VARCHAR(255) NOT NULL,'
       +'authority VARCHAR(255) NOT NULL,'
       +'oname VARCHAR(255) NOT NULL,'
       +'FOREIGN KEY (registerid) REFERENCES Registers(regid),'
       +'registerid VARCHAR(255) NOT NULL,'
       +'scode VARCHAR(255) NOT NULL,'
       +'FOREIGN KEY (scode) REFERENCES station(scode)'

   ],
   [
       'ptrr',
       'ptrrid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
       +'sl_no VARCHAR(255) NOT NULL,'
       +'commencing_number VARCHAR(255) NOT NULL,'
       +'closing_number VARCHAR(255) NOT NULL,'
       +'user_id VARCHAR(255) NOT NULL,'
       +'commencing_date VARCHAR(255) NOT NULL,'
       +'terminal VARCHAR(255) NOT NULL,'
       +'closing_user_id VARCHAR(255) NOT NULL,'
       +'closing_date VARCHAR(255) NOT NULL,'
       +'oname VARCHAR(255) NOT NULL,'
       +'FOREIGN KEY (registerid) REFERENCES Registers(regid),'
       +'registerid VARCHAR(255) NOT NULL,'
       +'scode VARCHAR(255) NOT NULL,'
       +'FOREIGN KEY (scode) REFERENCES station(scode)'
   ]

   
]