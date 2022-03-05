const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, res, cb){
        cb(null, './uploads/userPics')
    },
    filename: function(req, file, cb){
        cb(null, 'ice'+'-'+Date.now() + path.extname(file.originalname))
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null, true)
    } else {
        cb('Unsupported File Type', false)
    }
}

let upload = multer({
    storage:storage,
    limits:{fileSize: 1024*1024*2},
    fileFilter: fileFilter
}).single('profilePic');

module.exports = upload