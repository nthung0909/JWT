const express = require('express');
const router = express.Router();
const controller = require('./controllers');

router.get('/login', controller.login);
router.get('/refreshToken', controller.refreshToken);
router.get('/logout', controller.logout);

module.exports = router;