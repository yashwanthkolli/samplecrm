const express = require('express');
const router = express.Router();

const { 
    changePasswordController, 
    addUserController,
    addStaffUserController,
    addAdminController
} = require('../controllers/user.controller');
const { verifyHigherLevel } = require('../validations/higherlevel');
const { middleLevel } = require('../validations/middlelevel');

router.post('/changePassword', changePasswordController);
router.post('/addUser', verifyHigherLevel, addUserController);
router.post('/addStaffUser',middleLevel,  addStaffUserController);
router.post('/addAdminUser',verifyHigherLevel, addAdminController);

module.exports = router;