const { connect } = require('../config/db');

exports.latestLeadController = (req, res) => {

    countLeads_query = 'select count(*) as count from ice.leads';
    connect.query(countLeads_query, function(err, result){
        if(err){
            return res.status(500).json({
                message: "Server error in fetching data"
            })
        }

        if(result[0].count <= 20){
            leads_query = 'select leads.Lead_id, leads.Name, leads.Email, leads.Mobile, leads.Qualif, leads.Source, leads.Ad_Name, leads.City, leads.Status, leads.UpdationDt, leads.AssignDt, leads.DOB, leads.Hot, leads.Comment, leads.AssignedTo,'
            +' courses.id as courseId, courses.name as course, courses.type as courseType, courses.Cost as courseCost,'
            +' employees.Firstname as creatorF, employees.Surname as creatorS, e.Firstname as assignF, e.Surname as assignS from ice.leads inner join ice.employees on leads.CreatedBy = employees.Email'
            +' inner join ice.employees as e on leads.AssignedTo = e.Employee_ID inner join ice.courses on leads.Course = courses.id';
            connect.query(leads_query, function(err, r){
                if(err){
                     ;
                    return res.status(500).json({
                        message: "Error in fetching the data"
                    })
                }
                return res.status(200).json({
                    message: "Data fetched",
                    latest: r
                })
            })
        } else {
            const countLeads = result[0].count - 5;
            latestLeads_query = 'select leads.Lead_id, leads.Hot, leads.Name, leads.Email, leads.Mobile, leads.Qualif, leads.Source, leads.Ad_Name, courses.id as courseId, courses.name as course, courses.type as courseType, courses.Cost as courseCost, leads.City, employees.Firstname, e.Firstname, leads.Status from ice.leads inner join ice.employees on leads.CreatedBy = employees.Email inner join ice.employees as e on leads.AssignedTo = e.Employee_ID inner join ice.courses on leads.Course = courses.id where leads.name not in (select name from ice.leads limit'+ countLeads + ')';
            connect.query(latestLeads_query, function(err, re){
                if(err){
                    return res.status(500).json({
                        message: "Server error in fetching data"
                    })
                }
                return res.status(200).json({
                    message:"Fetched data",
                    latest: re
                })
            })
        }
    })
}

exports.addNewLeadsController = (req, res) => {
    
    const {
        name,
        email_lead,
        mobile, city, source, status, qualif, course, comment, assignTo, email, ad_name, otherComment, commentName, hot, dob
    } = req.body;
    const now = new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().split(' ')[0];

    var comment_select = "";
    var hot_indicator = 0;

    if(otherComment !== ""){
        comment_select = otherComment
    } else {
        comment_select = comment
    }

    if(hot){
        hot_indicator = 1
    }

    addnewlead_query = 'insert into ice.leads (Name, Email, Mobile, Qualif, Source, Ad_Name, Course, City, AssignedTo, Status, CreatedBy, Createdt, AssignDt, Comment, UpdationDt, DOB, Hot) values ('
        + ' \''+ name +'\' ,'
        + ' \''+ email_lead +'\' ,'
        + ' \''+ mobile +'\' ,'
        + ' \''+ qualif +'\' ,'
        + ' \''+ source +'\' ,'
        + ' \''+ ad_name +'\' ,'
        + ' \''+ course +'\' ,'
        + ' \''+ city +'\' ,'
        + ' \''+ assignTo +'\' ,'
        + ' \''+ status +'\','
        + ' \''+ email +'\' ,'
        + ' \''+ now +'\' ,'
        + ' \''+ now +'\' ,'
        + ' JSON_INSERT(\'[]\', \'$[0]\', cast(\'["'+ comment_select + '", "' + commentName  + '", ' + new Date().getTime() + ']\' as JSON)),'
        + ' \''+ now + '\','
        + ' \''+ dob + '\','
        + '\'' + hot_indicator + '\')';

    connect.query(addnewlead_query, function(err){
        console.log(err);
        if(err){
            return res.status(500).json({
                err: err 
            })
        } else {
            return res.status(200).json({
                message: "Created Leads Successfully"
            })
        }
    })
}

exports.fetchTopPlaceLeadsController = (req, res) => {

    leads_fetch = 'select City, count(City) as \'count\' from ice.leads group by City having count(City) > 0 order by count desc limit 35';
    connect.query(leads_fetch, function(err, result){
        if(err){
            return res.status(500).json({
                message: "Error in fetching details"
            })
        }
        return res.status(200).json({
            message: "Fetched Courses",
            leads: result
        })
    })
}

exports.fetchNumberOfLeadsController = (req, res) => {
    leads_count = 'select count(*) as count from ice.leads';
    connect.query(leads_count, function(err, result){
        if(err){
            return res.status(500).json({
                message: "Error in fetching details"
            })
        }
        return res.status(200).json({
            message: "Fetched Courses",
            count: result
        })
    })
}

exports.fetchLeadToppersController = (req, res) => {
    leads_toppers = 'SELECT CONCAT(Firstname, \' \', Surname) AS AssignedTo, sum(CASE WHEN e.Employee_ID = t.AssignedTo IS NULL THEN 0 ELSE 1 END) count FROM ice.employees e LEFT JOIN ice.leads t ON t.AssignedTo = e.Employee_ID GROUP BY Employee_ID ORDER BY count desc limit 10'
    connect.query(leads_toppers, function(err, result){
        if(err){
            return res.status(500).json({
                message: "Error in fetching details"
            })    
        }
        return res.status(200).json({
            message: "Fetched Courses",
            count: result
        })
    })
}

exports.fetchCountWebsiteLeads = (req, res) => {
    website_leads = 'select AssignedTo, count(AssignedTo) as \'count\' from ice.leads where AssignedTo in (select AssignedTo from ice.leads where AssignedTo = \'636-Website Lead Pool\') group by AssignedTo having count(AssignedTo) > 0 order by count desc limit 10';
    connect.query(website_leads, function(err, result){
        if(err){
            return res.status(500).json({
                message: "Error in fetching details"
            })
        }
        return res.status(200).json({
            message: "Fetched Courses",
            count: result
        })
    })
}

exports.fetchCurrentMonthLeads = (req, res) => {
    
    const {fromDate, toDate} = req.body
    count_fetch = 'SELECT Venue, COUNT(Venue) AS \'count\' FROM ice.leads WHERE Createdt BETWEEN \''+ fromDate +'\' AND \''+ toDate +'\' AND STATUS = \'5-Confirmed\' GROUP BY Venue HAVING COUNT(Venue)>0 ORDER BY COUNT DESC LIMIT 5';
    connect.query(count_fetch, function(err, result){
        
        if(err){
            return res.status(500).json({
                message: "Error in fetching details"
            })
        }
        return res.status(200).json({
            message: "Fetched Courses",
            count: result
        })
    })
}

exports.fetchLastFifteenDayLeads = (req, res) => {

    const currentDate = new Date().getDate() < 10 ? `0${new Date().getDate().toString()}` : new Date().getDate().toString()
    const currentMonth = new Date().getMonth() + 1 < 10 ? `0${(new Date().getMonth()+1).toString()}` : (new Date().getMonth()+1).toString()
    const date = `${new Date().getFullYear()}-${currentMonth}-${currentDate} 00:00:00`

    const fifteen = new Date(new Date(date).setDate(new Date(date).getDate() - 15))
    const pastDate = fifteen.getDate() < 10 ? `0${fifteen.getDate().toString()}` : fifteen.getDate().toString()
    const pastMonth = fifteen.getMonth() + 1 < 10 ? `0${(fifteen.getMonth()+1).toString()}` : (fifteen.getMonth()+1).toString()
    const fifteenDate = `${fifteen.getFullYear()}-${pastMonth}-${pastDate} 00:00:00`

    fetch_fifteen = 'SELECT CAST(Createdt AS DATE) AS Createdt, COUNT(CAST(Createdt AS DATE)) AS \'count\' FROM ice.leads WHERE Createdt BETWEEN \''+ fifteenDate + '\' AND \''+ date + '\' AND STATUS = \'5-Confirmed\' GROUP BY CAST(Createdt AS DATE) HAVING COUNT(CAST(Createdt AS DATE))>0 LIMIT 15';
    connect.query(fetch_fifteen, function(err, result){
        if(err){
            return res.status(500).json({
                message: "Error in fetching details"
            })
        }
        return res.status(200).json({
            message: "Fetched Courses",
            leads: result
        })
    })
}

exports.fetchSourceCount = (req, res) => {

    source_count = 'SELECT Source, COUNT(Source) AS \'count\' FROM ice.leads GROUP BY Source HAVING COUNT(Source)>0 limit 7';
    connect.query(source_count, function(err, result){
        if(err){
            return res.status(500).json({
                message: "Error in fetching details"
            })
        }
        return res.status(200).json({
            message: "Fetched Courses",
            sources: result
        })
    })
}

exports.fetchTopCourseCount = (req, res) => {

    course_count = 'SELECT courses.Name, COUNT(courses.Name) AS \'count\' FROM ice.leads inner join ice.courses on leads.Course = courses.id GROUP BY courses.Name HAVING COUNT(courses.Name)>0 ORDER BY count DESC LIMIT 6';
    connect.query(course_count, function(err, result){
        if(err){
            return res.status(500).json({
                message: "Error in fetching details"
            })
        }
        return res.status(200).json({
            message: "Fetched Courses",
            courses: result
        })
    })
}

exports.fetchTotalCourseCount = (req, res) => {
    total_course_count = 'SELECT COUNT(courses.Name) AS \'count\' FROM ice.leads inner join ice.courses on leads.Course = courses.id HAVING COUNT(courses.Name)>0';
    connect.query(total_course_count, function(err, result){
        if(err){
            return res.status(500).json({
                message: "Error in fetching details"
            })
        }
        return res.status(200).json({
            message: "Fetched Total",
            total: result
        })
    })
}

exports.searchLeadsController = (req, res) => {
    const { category, startDate, endDate, sentValue} = req.body;

    searchCount_Query = 'select count(*) as count from ice.leads where Createdt between \'' + startDate + '\' and \'' + endDate + ' 23:59:59\'';
    
    if(Number(req.query.page) === 1){
        if(category === "Date"){
            search_Query = 'select leads.Lead_id, leads.Name, leads.Email, leads.Mobile, leads.Qualif, leads.Source, leads.Ad_Name, leads.City, leads.Status, leads.UpdationDt, leads.AssignDt, leads.DOB, leads.Hot, leads.AssignedTo,'
            +' courses.id as courseId, courses.name as course, courses.type as courseType, courses.Cost as courseCost,'
            +' employees.Firstname as creatorF, employees.Surname as creatorS, e.Firstname as assignF, e.Surname as assignS from ice.leads inner join ice.employees on leads.CreatedBy = employees.Email'
            +' inner join ice.employees as e on leads.AssignedTo = e.Employee_ID inner join ice.courses on leads.Course = courses.id'
            +' where leads.Createdt between \'' + startDate + '\' and \'' + endDate + ' 23:59:59\' order by leads.Createdt desc limit 40';
        } else {
            search_Query = 'select leads.Lead_id, leads.Name, leads.Email, leads.Mobile, leads.Qualif, leads.Source, leads.Ad_Name, leads.City, leads.Status, leads.UpdationDt, leads.AssignDt, leads.DOB, leads.Hot, leads.AssignedTo,'
            +' courses.id as courseId, courses.name as course, courses.type as courseType, courses.Cost as courseCost,'
            +' employees.Firstname as creatorF, employees.Surname as creatorS, e.Firstname as assignF, e.Surname as assignS from ice.leads inner join ice.employees on leads.CreatedBy = employees.Email'
            +' inner join ice.employees as e on leads.AssignedTo = e.Employee_ID inner join ice.courses on leads.Course = courses.id'
            +' where leads.' + category + ' = \'' + sentValue + '\' order by leads.Createdt desc limit 40';
        }
    } else {
        const sl = Number(req.query.page) * 40;
        const el = (Number(req.query.page) + 1) * 40;

        if(category === "Date"){
            search_Query = 'select leads.Lead_id, leads.Name, leads.Email, leads.Mobile, leads.Qualif, leads.Source, leads.Ad_Name, leads.City, leads.Status, leads.UpdationDt, leads.AssignDt, leads.DOB, leads.Hot, leads.AssignedTo,'
            +' courses.id as courseId, courses.name as course, courses.type as courseType, courses.Cost as courseCost,'
            +' employees.Firstname as creatorF, employees.Surname as creatorS, e.Firstname as assignF, e.Surname as assignS from ice.leads inner join ice.employees on leads.CreatedBy = employees.Email'
            +' inner join ice.employees as e on leads.AssignedTo = e.Employee_ID inner join ice.courses on leads.Course = courses.id'
            +' where leads.Createdt between \'' + startDate + '\' and \'' + endDate + ' 23:59:59\' order by leads.Createdt desc limit ' + sl + ',' + el;
        } else { 
            search_Query = 'select leads.Lead_id, leads.Name, leads.Email, leads.Mobile, leads.Qualif, leads.Source, leads.Ad_Name, leads.City, leads.Status, leads.UpdationDt, leads.AssignDt, leads.DOB, leads.Hot, leads.AssignedTo,'
            +' courses.id as courseId, courses.name as course, courses.type as courseType, courses.Cost as courseCost,'
            +' employees.Firstname as creatorF, employees.Surname as creatorS, e.Firstname as assignF, e.Surname as assignS from ice.leads inner join ice.employees on leads.CreatedBy = employees.Email'
            +' inner join ice.employees as e on leads.AssignedTo = e.Employee_ID inner join ice.courses on leads.Course = courses.id'
            +' where leads.' + category + ' = \'' + sentValue + '\' order by leads.Createdt desc limit ' + sl + ',' + el;
        }
    }

    connect.query(searchCount_Query, function(err, r){
        if(err){
            return res.status(500).json({
                message: "Error in executing the search"
            })
        }

        connect.query(search_Query, function(err, result){
            if(err){
                return res.status(500).json({
                    message: "Error in fetching data"
                })
            }
            return res.status(200).json({
                message: "Fetched search query result",
                queryResult: result,
                queryCount: r[0].count
            })
        })
    })
}

exports.modifyDetailController = (req, res) => {

    const date  = new Date(new Date(req.body.DOB).getTime() - new Date(req.body.DOB).getTimezoneOffset()*60*1000).toISOString().split("T")[0];

    update_query = 'update ice.leads set Name = \'' + req.body.Name + '\', Email = \'' + req.body.Email + '\','
        + ' City = \'' + req.body.City + '\', DOB = \'' + date + '\', Mobile = \'' + req.body.Mobile + '\', Qualif = \'' + req.body.Qualif 
        + '\' where Lead_id = ' + Number(req.body.id);

    connect.query(update_query, function(err, result){
        if(err){
            return res.status(500).json({
                message: "Error in updating the lead details"
            })
        }

        return res.status(200).json({
            message: "Lead Details Updated Successfully"
        })
    })
}

exports.modifySourceCourseController = (req, res) => {

    update_course_query = 'update ice.leads set Course = \'' + req.body.course + '\', Source = \'' + req.body.source + '\' where Lead_id = ' + req.body.id;

    connect.query(update_course_query, function(err, result){
        if(err){
            return res.status(500).json({
                message: "Error in updating the lead course and source"
            })
        }

        return res.status(200).json({
            message: "Lead course and source updated successfully"
        })
    })
}

exports.statusUpdateController = (req, res) => {
    
    const { Lead_id, status, followUpDate, followUpTime, assignedTo, oldComment, newcomment, newotherComment, interviewDate, interviewTime, venue, assignChange, commentName, updatorId, hot} = req.body;
    
    const now = new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().split(' ')[0];
    var comment = newcomment === "others" ? newotherComment : newcomment;
    var updateDateTime, statusQuery;

    var final_query = 'update ice.leads set Comment = JSON_ARRAY_APPEND(\''+ oldComment +'\', \'$\', cast(\'["'+ comment +'", "' + commentName + '", ' + new Date().getTime() +']\' as JSON))';

    if(status === "Confirmed"){
        updateDateTime = interviewDate + " " +interviewTime + ":00";
        statusQuery = ',  Status = \'Confirmed\', Lstfudt = \'' + updateDateTime + '\', Venue = \'' + venue + '\'' ;
    } else {
        updateDateTime = followUpDate + " " + followUpTime + ":00";
        statusQuery = ', Status = \''+ status + '\', Lstfudt = \'' + updateDateTime + '\'';
    }

    final_query = final_query + statusQuery;

    if(assignedTo === assignChange || typeof assignChange === "undefined"){
    } else {
        final_query = final_query + ',  AssignedTo = \'' + assignedTo + ',  AssignDt = \'' + now
    }

    finalsubset_query = ',  UpdationDt = \'' + now + '\', CallingDt = \'' + now + '\', Updateuserid = ' + updatorId + ', Hot = '+ hot + ' where Lead_id = '+ Lead_id ;
    
    final_query = final_query + finalsubset_query;

    connect.query(final_query, function(err, result){
        if(err){
            console.log(err);
            return res.status(400).json({
                message: "Error in updating resources"
            })
        }

        return res.status(200).json({
            message: "Update Successfull"
        })
    })
}