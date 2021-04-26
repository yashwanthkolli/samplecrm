module.exports = [
    [
        'Employees',
        'Employee_ID VARCHAR(8) NOT NULL,'
        +' Firstname CHAR(20) NOT NULL, Surname CHAR(20) NOT NULL, '
        +' Email VARCHAR(50) NOT NULL unique, Mobile VARCHAR(13) NOT NULL,'
        +' Password VARCHAR(20) NOT NULL,'
        +' DOB DATE NOT NULL,'
        +' Address VARCHAR(100),'
        +' City VARCHAR(30),'
        +' Status CHAR(10) DEFAULT \'Active\' ,'
        +' Type CHAR(30) NOT NULL,'
        +' Reporting CHAR(40) NOT NULL,'
        +' Picture VARCHAR(255),'
        +' Timings JSON DEFAULT NULL,'
        +' Primary Key(Employee_ID)'
    ],
    [
        'Leads',
        'Lead_id int NOT NULL AUTO_INCREMENT, Primary Key(Lead_id),'
        +' Name VARCHAR(255) NOT NULL,'
        +' Email VARCHAR(255) NOT NULL Unique,'
        +' Mobile Varchar(20),'
        +' Qualif Varchar(255),'
        +' Source Varchar(255) NOT NULL,'
        +' Ad_Name Varchar(255) Default \'None\','
        +' Course Varchar(255) NOT NULL,'
        +' City Varchar(255) NOT NULL,'
        +' AssignedTo Varchar(255) NOT NULL,'
        +' Status Varchar(255) NOT NULL,'
        +' CreatedBy Varchar(255) NOT NUll,'
        +' Createdt Datetime,'
        +' Lstfudt Datetime,'
        +' Venue Varchar(100),'
        +' AssignDt Datetime,'
        +' CallingDt Datetime,'
        +' UpdationDt Datetime,'
        +' Updateuserid varchar(10),'
        +' Comment Varchar(255)'
    ],
    [
        'courses',
        'id int auto_increment primary key,'
        +'name VARCHAR(255) NOT NULL,'
        +' type VARCHAR(100) NOT NULL,'
        +' Cost varchar(100) NOT NULL'
    ],
    [
        'status',
        'id int auto_increment primary key,'
        + 'name Varchar(255) Not null'
    ],
    [
        'sources',
        'id int auto_increment primary key,'
        + 'name Varchar(255) Not null'
    ],
    [
        'comments',
        'id int auto_increment primary key,'
        + 'comment Varchar(255) Not null'
    ],
    [
        'ads',
        'id int auto_increment primary key,'
        +'ad_name Varchar(255) Not null,'
        +'medium Varchar(255) not null,'
        +'place varchar(255) not null'
    ]
]