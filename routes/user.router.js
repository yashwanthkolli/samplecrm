const express = require('express');
const router = express.Router();

const { detailsController } = require('../controllers/user.controller');

router.post('/detailsUser', detailsController);

module.exports = router;