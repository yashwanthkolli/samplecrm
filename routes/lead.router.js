const express = require('express');
const router = express.Router();

const { 
    latestLeadController,
    addNewLeadsController,
    fetchTopPlaceLeadsController, 
    addNewLeadsController,
    fetchNumberOfLeadsController, 
    fetchLeadToppersController, 
    fetchCountWebsiteLeads, 
    fetchCurrentMonthLeads, 
    fetchLastFifteenDayLeads, 
    fetchSourceCount, 
    fetchTopCourseCount, 
    fetchTotalCourseCount 
} = require('../controllers/lead.controller');
const { verifyHigherLevel } = require('../validations/higherlevel');

router.post('/getLatestLeads', verifyHigherLevel, latestLeadController);
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

module.exports = router;