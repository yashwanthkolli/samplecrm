const express = require('express');
const router = express.Router();

const { addController } = require('../controllers/index.controller.js'); // import the controllers for the routes assigned.

router.get('/addRoute', addController);

module.exports = router;