const express = require('express');
const userController = require('../controller/UserController');

const router =  express.Router();

router.post('/create', userController.signUp);
router.post('/login', userController.login);

module.exports = router;