const express = require('express');
const router = express.Router();

const { loginController } = require('../controllers/auth.controller');

router.post('/userLogin', loginController);

module.exports = router;