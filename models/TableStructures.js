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
        'Date date,'
         +'shift INT,'
         +'userid VARCHAR(255) NOT NULL,'
         +'login_time timestamp,'
         +'commencing_number INT,'
         +'closing_number INT,'
         +'logout_time timestamp ,'
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
         +'FOREIGN KEY (TOC) REFERENCES users(sid),'
         +'oname VARCHAR(255) NOT NULL,'
         +'FOREIGN KEY (registerid) REFERENCES Registers(regid),'
         +'registerid VARCHAR(255) NOT NULL,'
         +'scode VARCHAR(255) NOT NULL,'
         +'FOREIGN KEY (scode) REFERENCES Station(scode)'

    ],
    [
        'PCD',
        'Date date,'
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
        'Date date,'
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
        'Date date,'
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
        'Date date,'
        +'ID VARCHAR(255) NOT NULL,'
        +'Time timestamp,'
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
        'ID VARCHAR(255) NOT NULL,'
        +'Failure_Date date,'
        +'Failure_time timestamp,'
        +'Reporting_Date date,'
        +'Reporting_time timestamp,'
        +'Rectification_Date date,'
        +'Rectification_time timestamp,'
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
        'Roll_No VARCHAR(255) NOT NULL,'
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
        'sl_no VARCHAR(255) NOT NULL,'
        +'Date date,'
        +'Party_name_and_address VARCHAR(255) NOT NULL,'
        +'Permission_authority_No VARCHAR(255) NOT NULL,'
        +'Train_No VARCHAR(255) NOT NULL,'
        +'Date_of_Journey date,'
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
       'sl_no VARCHAR(255) NOT NULL,'
        +'Date date,'
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
       'sl_no VARCHAR(255) NOT NULL,'
        +'Date date,'
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


       
   ]
   
]