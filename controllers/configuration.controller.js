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
    return res.status(200).json({
        message: "Fetched Status"
    })
}

exports.commentFetchController = (req, res) => {
    return res.status(200).json({
        message: "Fetched Comments"
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