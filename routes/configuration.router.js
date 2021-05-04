const express = require('express');
const router = express.Router();

const {
    courseFetchController,
    statusFetchController,
    sourceFetchController,
    courseDeleteController,
    courseAddController,
    commentsFetchController,
    commentsDeleteController,
    courseUpdateController,
    commentAddController,
    adsFetchController,
    adsDeleteController,
    adsAddController,
    statusDeleteController,
    statusAddController,
    sourceDeleteController,
    sourceAddController,
    fetchUsersController,
    userDeleteController,
    fetchReportingEmployees
} = require('../controllers/configuration.controller');
const {
    verifyHigherLevel
} = require('../validations/higherlevel')

router.post('/getCourses', courseFetchController);
router.post('/deleteCourses', verifyHigherLevel, courseDeleteController);
router.post('/addCourses', verifyHigherLevel, courseAddController);
router.post('/updateCourses', verifyHigherLevel, courseUpdateController);
router.post('/getComments', commentsFetchController);
router.post('/deleteComments', verifyHigherLevel, commentsDeleteController);
router.post('/addComments', verifyHigherLevel, commentAddController);
router.post('/getAds', adsFetchController);
router.post('/deleteAds', verifyHigherLevel, adsDeleteController);
router.post('/addAds', verifyHigherLevel, adsAddController);
router.post('/getStatus', statusFetchController);
router.post('/deleteStatus', verifyHigherLevel, statusDeleteController);
router.post('/addStatus', verifyHigherLevel, statusAddController);
router.post('/getSource', sourceFetchController);
router.post('/deleteSource', verifyHigherLevel, sourceDeleteController);
router.post('/addSource', verifyHigherLevel, sourceAddController);
router.post('/getUsers', verifyHigherLevel, fetchUsersController);
router.post('/deleteUser', userDeleteController);
router.post('/getReportingEmployees', fetchReportingEmployees);


module.exports = router;