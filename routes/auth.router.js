const express = require('express');
const router = express.Router();

const { loginController, stationController } = require('../controllers/auth.controller');

router.post('/userLogin', loginController);
router.post('/stationLogin',stationController);

module.exports = router;