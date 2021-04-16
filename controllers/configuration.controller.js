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
            courses: result[0]
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