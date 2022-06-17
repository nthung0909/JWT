const express = require('express');
const router = express.Router();
const controller = require('./controllers');

router.get('/login', controller.login);

module.exports = router;