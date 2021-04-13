const express = require('express');
const router = express.Router();

const { detailsController, changePasswordController } = require('../controllers/user.controller');

router.post('/detailsUser', detailsController);
router.post('/changePassword', changePasswordController);

module.exports = router;