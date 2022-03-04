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
         +'TOC VARCHAR(255) NOT NULL,'
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
        +'registerid VARCHAR(255) NOT NULL'
    ],
    [
        'Registers',
        'regid VARCHAR (255) NOT NULL,Primary key(regid),'
        +'regname VARCHAR (255) NOT NULL,'
        +'oname VARCHAR (255) NOT NULL'
        

    ]
]