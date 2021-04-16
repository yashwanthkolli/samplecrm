const express = require('express');
const router = express.Router();

const { latestLeadController, courseController } = require('../controllers/lead.controller');
const { verifyHigherLevel } = require('../validations/higherlevel');

router.post('/getLatestLeads', verifyHigherLevel, latestLeadController);
router.post('/getConfigurations', verifyHigherLevel, courseController);

module.exports = router;