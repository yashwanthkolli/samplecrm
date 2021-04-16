const express = require('express');
const router = express.Router();

const { latestLeadController, configurationController } = require('../controllers/lead.controller');
const { verifyHigherLevel } = require('../validations/higherlevel');

router.post('/getLatestLeads', verifyHigherLevel, latestLeadController);
router.post('/getConfigurations', verifyHigherLevel, configurationController);

module.exports = router;