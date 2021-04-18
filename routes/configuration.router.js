const express = require('express');
const { verify } = require('jsonwebtoken');
const router = express.Router();

const {
    courseFetchController,
    statusFetchController,
    sourceFetchController,
    commentFetchController,
    courseDeleteController,
    courseAddController,
    commentsFetchController,
    commentsDeleteController,
    courseUpdateController,
    commentAddController,
    adsFetchController,
    adsDeleteController,
    adsAddController
} = require('../controllers/configuration.controller');
const {
    verifyHigherLevel
} = require('../validations/higherlevel')

router.post('/getCourses', verifyHigherLevel, courseFetchController);
router.post('/deleteCourses', verifyHigherLevel, courseDeleteController);
router.post('/addCourses', verifyHigherLevel, courseAddController);
router.post('/updateCourses', verifyHigherLevel, courseUpdateController);

router.post('/getComments', verifyHigherLevel, commentsFetchController);
router.post('/deleteComments', verifyHigherLevel, commentsDeleteController);
router.post('/addComments', verifyHigherLevel, commentAddController);

router.post('/getAds', verifyHigherLevel, adsFetchController);
router.post('/deleteAds', verifyHigherLevel, adsDeleteController);
router.post('/addAds', verifyHigherLevel, adsAddController);

router.post('/getStatus', verifyHigherLevel, statusFetchController);
router.post('/getSource', verifyHigherLevel, sourceFetchController);
router.post('/getComments', verifyHigherLevel, commentFetchController);
router.post('/getAdName', verifyHigherLevel, adsFetchController);

module.exports = router;