const express = require('express');
const router = express.Router();

const { 
    changePasswordController, 
    addUserController,
    addStaffUserController
} = require('../controllers/user.controller');
const { verifyHigherLevel } = require('../validations/higherlevel');
const { middleLevel } = require('../validations/middlelevel');

router.post('/changePassword', changePasswordController);
router.post('/addUser', verifyHigherLevel, addUserController);
router.post('/addStaffUser',middleLevel,  addStaffUserController);
module.exports = router;