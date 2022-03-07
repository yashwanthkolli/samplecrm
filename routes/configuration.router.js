const express = require('express');
const router = express.Router();

const {
    userDeleteController,
    fetchAdminEmployees,
    fetchSupervisorEmployees,
    fetchRegistersList,
    fetchRegistersLogs,
    fetchStaffLogs,
    addRegisters,
    addPcdRegisters,
    addNitRegisters,
    addMmrRegisters,
    addNcrRegisters,
    addWleRegisters,
    addBbrRegisters,
    addSctRegisters,
    addFrRegisters,
    addTsiRegisters,
    registerDeleteController
} = require('../controllers/configuration.controller');

const {
    verifyHigherLevel
} = require('../validations/higherlevel')

router.post('/deleteUser', userDeleteController);
router.post('/deleteRegister', registerDeleteController);
router.post('/getAdminEmployees', fetchAdminEmployees);
router.post('/getSupervisorEmployees',fetchSupervisorEmployees);
router.post('/getRegisters', fetchRegistersList);
router.post('/getRegistersData', fetchRegistersLogs);
router.post('/getStaffLogs', fetchStaffLogs);
router.post('/addRegisters', addRegisters);
router.post('/addPcdRegisters', addPcdRegisters);
router.post('/addNitRegisters', addNitRegisters);
router.post('/addMmrRegisters', addMmrRegisters);
router.post('/addncrRegisters',  addNcrRegisters);
router.post('/addWleRegisters',  addWleRegisters);
router.post('/addBbrRegisters', addBbrRegisters);
router.post('/addSctRegisters', addSctRegisters);
router.post('/addFrRegisters', addFrRegisters);
router.post('/addtsiRegisters', addTsiRegisters);
module.exports = router;