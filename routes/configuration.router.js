const express = require('express');
const router = express.Router();

const {
    userDeleteController,
    fetchAdminEmployees,
    fetchSupervisorEmployees,
    fetchRegistersList,
    fetchRegistersLogs,
    fetchStaffLogs
} = require('../controllers/configuration.controller');
const {
    verifyHigherLevel
} = require('../validations/higherlevel')

router.post('/deleteUser', userDeleteController);
router.post('/getAdminEmployees', fetchAdminEmployees);
router.post('/getSupervisorEmployees',fetchSupervisorEmployees);
router.post('/getRegisters', fetchRegistersList);
router.post('/getRegistersData', fetchRegistersLogs);
router.post('/getStaffLogs', fetchStaffLogs);

module.exports = router;