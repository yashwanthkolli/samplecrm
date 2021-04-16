const express = require('express');
const router = express.Router();

const {
    courseFetchController,
    statusFetchController,
    sourceFetchController,
    commentFetchController,
} = require('../controllers/configuration.controller');

router.post('/getCourses', courseFetchController);
router.post('/getStatus', statusFetchController);
router.post('/getSource', sourceFetchController);
router.post('/getComments', commentFetchController);

module.exports = router;