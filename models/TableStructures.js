module.exports = [
    [
        'Employees',
        'id int NOT NULL AUTO_INCREMENT,'
        +' Employee_ID VARCHAR(8) NOT NULL,'
        +' Firstname CHAR(20) NOT NULL, Surname CHAR(20) NOT NULL, '
        +' Email VARCHAR(50) NOT NULL unique, Mobile VARCHAR(13) NOT NULL,'
        +' Password VARCHAR(20) NOT NULL,'
        +' DOB DATE NOT NULL,'
        +' Address VARCHAR(100),'
        +' City VARCHAR(30),'
        +' Status CHAR(10) DEFAULT \'Active\' ,'
        +' Type CHAR(30) NOT NULL,'
        +' Reporting CHAR(40) NOT NULL,'
        +' Primary Key(id)'
    ],
    [
        'Leads',
        'id int NOT NULL AUTO_INCREMENT, Primary Key(id)'
    ]
]