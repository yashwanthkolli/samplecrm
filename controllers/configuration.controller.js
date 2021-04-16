exports.courseFetchController = (req, res) => {
    return res.status(200).json({
        message: "Fetched Configurations"
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
    return res.status(200).json({
        message: "Fetched Source"
    })
}