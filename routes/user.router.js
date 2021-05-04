const express = require('express');
const router = express.Router();

const { detailsController,
    changePasswordController, 
    uploadDisplayController,
    userListController,
    addUserController,
    employeeAssignedController,
    getLoginTimeController,
    setLoginTimeController,
    getCityNamesController,
    telecallerListController
} = require('../controllers/user.controller');
const { verifyHigherLevel } = require('../validations/higherlevel');

router.post('/detailsUser', detailsController);
router.post('/changePassword', changePasswordController);
router.post('/uploadPicture', uploadDisplayController);
router.post('/usersList', verifyHigherLevel, userListController);
router.post('/addUser', verifyHigherLevel, addUserController);
router.post('/getEmployeeList', verifyHigherLevel, employeeAssignedController);
router.post('/getEmployeeTimings', getLoginTimeController);
router.post('/setEmployeeTimings', setLoginTimeController);
router.post('/getCityNames', getCityNamesController);
router.post('/getTelecallerList', telecallerListController);

module.exports = router;