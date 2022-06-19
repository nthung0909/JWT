const express = require('express');
const router = express.Router();
const controller = require('./controller');
const auth = require('../../middleware/auth');

router.get('/', auth.verifyToken,  controller.getData);

module.exports = router;