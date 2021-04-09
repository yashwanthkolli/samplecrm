const express = require('express');
const router = express.Router();

const { loginController } = require('../controllers/auth.controller');

router.post('/loginUser', loginController);

module.exports = router;