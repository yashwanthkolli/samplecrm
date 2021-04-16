const express = require('express');
const router = express.Router();

const { latestLeadController } = require('../controllers/lead.controller');
const { verifyHigherLevel } = require('../validations/higherlevel');

router.post('/getLatestLeads', verifyHigherLevel, latestLeadController);

module.exports = router;