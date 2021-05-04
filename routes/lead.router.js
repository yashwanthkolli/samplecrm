const express = require('express');
const router = express.Router();

const { 
    latestLeadController,
    fetchTopPlaceLeadsController, 
    addNewLeadsController,
    fetchNumberOfLeadsController, 
    fetchLeadToppersController, 
    fetchCountWebsiteLeads, 
    fetchCurrentMonthLeads, 
    fetchLastFifteenDayLeads, 
    fetchSourceCount, 
    fetchTopCourseCount, 
    fetchTotalCourseCount,
    searchLeadsController,
    modifyDetailController,
    modifySourceCourseController,
    statusUpdateController
} = require('../controllers/lead.controller');
const { verifyHigherLevel } = require('../validations/higherlevel');

router.post('/getLatestLeads', latestLeadController);
router.post('/addNewLeads', verifyHigherLevel, addNewLeadsController);
router.post('/getPlaceLeads', verifyHigherLevel, fetchTopPlaceLeadsController);
router.post('/getNoOfLeads', verifyHigherLevel, fetchNumberOfLeadsController);
router.post('/getLeadToppers', verifyHigherLevel, fetchLeadToppersController);
router.post('/getWebsiteLeadsCount', verifyHigherLevel, fetchCountWebsiteLeads);
router.post('/currentMonthLeads', verifyHigherLevel, fetchCurrentMonthLeads);
router.post('/fifteenDaysLeads', verifyHigherLevel, fetchLastFifteenDayLeads);
router.post('/sourceCount', verifyHigherLevel, fetchSourceCount);
router.post('/courseCount', verifyHigherLevel, fetchTopCourseCount);
router.post('/totalCourseCount', verifyHigherLevel, fetchTotalCourseCount);
router.post('/searchLeads', searchLeadsController);
router.post('/modifyDetails', modifyDetailController);
router.post('/modifySourceCourse', modifySourceCourseController);
router.post('/statusUpdate', statusUpdateController);

module.exports = router;