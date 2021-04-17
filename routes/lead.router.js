const express = require('express');
const router = express.Router();

const { latestLeadController, addNewLeadsController } = require('../controllers/lead.controller');
const { verifyHigherLevel } = require('../validations/higherlevel');

router.post('/getLatestLeads', verifyHigherLevel, latestLeadController);
router.post('/addNewLeads', verifyHigherLevel, addNewLeadsController);

module.exports = router;