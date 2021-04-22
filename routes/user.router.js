const express = require('express');
const router = express.Router();

const { detailsController,
    changePasswordController, 
    uploadDisplayController,
    userListController,
    addUserController,
    employeeAssignedController
} = require('../controllers/user.controller');
const { verifyHigherLevel } = require('../validations/higherlevel');

router.post('/detailsUser', detailsController);
router.post('/changePassword', changePasswordController);
router.post('/uploadPicture', uploadDisplayController);
router.post('/usersList', verifyHigherLevel, userListController);
router.post('/addUser', verifyHigherLevel, addUserController);
router.post('/getEmployeeList', verifyHigherLevel, employeeAssignedController);

module.exports = router;