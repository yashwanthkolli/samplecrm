const {connect} = require('../config/db');

exports.courseFetchController = (req, res) => {

    course_fetch = 'select * from ice.courses';
    connect.query(course_fetch, function(err, result){
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

exports.courseAddController = (req, res) => {

    const { name, type, cost } = req.body
    course_add = 'insert into ice.courses (name, type, Cost) values('
    + '\'' + name + '\','
    + '\'' + type + '\','
    + '\'' + cost + '\''
    +')';
    connect.query(course_add, function(err, result) {
        if (err) {
            return res.status(500).json({
                message: "Error in Adding course"
            })
        }
        return res.status(200).json({
            message: "Course Added"
        })
    })
}

exports.courseDeleteController = (req, res) => {

    const { id } = req.body;
    course_delete = 'delete from ice.courses where id=\'' + id + '\''
    connect.query(course_delete, function(err, result) {
        if (err) {
            return res.status(500).json({
                message: "Error in Deleting course"
            })
        }
        return res.status(200).json({
            message: "Deleted rows"
        })
    })
}

exports.courseUpdateController = (req, res) => {

    const { id, name, type, cost } = req.body;
    course_update = 'update ice.courses set name = \'' 
    + name + '\','
    + 'type = \'' + type + '\','
    + 'cost = \'' + cost + '\' where id = \'' + id + '\''
    connect.query(course_update, function(err, result) {
        if(err){
            return res.status(500).json({
                message: "Error in updating details"
            })
        }
        return res.status(200).json({
            message: "Course updated"
        })
    })
}

exports.commentsFetchController = (req, res) => {

    comments_fetch = 'select * from ice.comments';
    connect.query(comments_fetch, function(err, result){
        if(err){
            return res.status(500).json({
                message: "Error in fetching details"
            })
        }
        return res.status(200).json({
            message: "Fetched Comments",
            comments: result
        })
    })
}

exports.commentsDeleteController = (req, res) => {

    const { id } = req.body;
    comment_delete = 'delete from ice.comments where id=\'' + id + '\'';
    connect.query(comment_delete, function(err, result) {
        if (err) {
            return res.status(500).json({
                message: "Error in Deleting course"
            })
        }
        return res.status(200).json({
            message: "Deleted rows"
        })
    })
}

exports.commentAddController = (req, res) => {

    const { comment } = req.body;
    comment_add = 'insert into ice.comments (comment) values (\'' + comment + '\')';
    connect.query(comment_add, function(err, result) {
        if(err){
            return res.status(500).json({
                message: "Error in fetching status"
            })
        }
        return res.status(200).json({
            message: "Comments Added"
        })
    })
}

exports.adsFetchController = (req, res) => {

    ads_fetch = 'select * from ice.ads';
    connect.query(ads_fetch, function(err, result){
        if(err){
            return res.status(500).json({
                message: "Error in fetching details"
            })
        }
        return res.status(200).json({
            message: "Fetched Ads",
            ads: result
        })
    })
}

exports.adsDeleteController = (req, res) => {

    const { id } = req.body;
    ad_delete = 'delete from ice.ads where id=\'' + id + '\'';
    connect.query(ad_delete, function(err, result) {
        if (err) {
            return res.status(500).json({
                message: "Error in Deleting Ad"
            })
        }
        return res.status(200).json({
            message: "Deleted rows"
        })
    })
}

exports.adsAddController = (req, res) => {

    const { form_id, name, source } = req.body;
    newAd_add = 'insert into ice.ads (form_id, name, source) values (' 
    + '\'' + form_id + '\','
    + '\'' + name + '\','
    + '\'' + source + '\''
    +')';
    connect.query(newAd_add, function(err, result) {
        if(err){
            return res.status(500).json({
                message: "Error in fetching status"
            })
        }
        return res.status(200).json({
            message: "New Ad Added"
        })
    })
}

exports.statusFetchController = (req, res) => {

    status_fetch = 'select * from ice.status';
    connect.query(status_fetch, function(err, result){
        if(err){
            return res.status(500).json({
                message: "Error in fetching status"
            })
        }
        return res.status(200).json({
            message: "Fetched Status",
            status: result
        })
    })
}

exports.commentFetchController = (req, res) => {

    comment_fetch = 'select * from ice.comments';
    connect.query(comment_fetch, function(err, result){
        if(err){
            return res.status(500).json({
                message: "Error in fetching comments"
            })
        }
        return res.status(200).json({
            message: "Fetched Comments",
            comments: result
        })
    })
}

exports.sourceFetchController = (req, res) => {

    source_fetch = 'select * from ice.sources';
    connect.query(source_fetch, function(err, result){
        if(err){
            return res.status(500).json({
                message: "Error in fetching the courses"
            })
        }
        return res.status(200).json({
            message: "Fetched Source",
            sources: result
        })
    })
}