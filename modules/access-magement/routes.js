const express = require('express');
const router = express.Router();
const controller = require('./controllers');

router.post('/login', controller.login);
router.post('/refreshToken', controller.refreshToken);
router.post('/logout', controller.logout);

module.exports = router;