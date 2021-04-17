const express = require('express');
const { verify } = require('jsonwebtoken');
const router = express.Router();

const {
    courseFetchController,
    statusFetchController,
    sourceFetchController,
    commentFetchController,
    adsFetchController
} = require('../controllers/configuration.controller');
const {
    verifyHigherLevel
} = require('../validations/higherlevel')

router.post('/getCourses', verifyHigherLevel, courseFetchController);
router.post('/getStatus', verifyHigherLevel, statusFetchController);
router.post('/getSource', verifyHigherLevel, sourceFetchController);
router.post('/getComments', verifyHigherLevel, commentFetchController);
router.post('/getAdName', verifyHigherLevel, adsFetchController);

module.exports = router;