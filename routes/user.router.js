const express = require('express');
const router = express.Router();

const { detailsController,
    changePasswordController, 
    uploadDisplayController,
    userListController,
    addUserController
} = require('../controllers/user.controller');

router.post('/detailsUser', detailsController);
router.post('/changePassword', changePasswordController);
router.post('/uploadPicture', uploadDisplayController);
router.post('/usersList', userListController);
router.post('/addUser', addUserController);

module.exports = router;