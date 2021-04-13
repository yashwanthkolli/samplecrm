const express = require('express');
const router = express.Router();

const { detailsController, changePasswordController, uploadDisplayController } = require('../controllers/user.controller');

router.post('/detailsUser', detailsController);
router.post('/changePassword', changePasswordController);
router.post('/uploadPicture', uploadDisplayController);

module.exports = router;