const express = require('express');
const router = express.Router();
const {AuthenticationController} = require('../controllers/authentication.controller');
const {userAuthorizationAPI} = require('../middlewares/authorization')


const authenticationController = new AuthenticationController();

router.post(`/login`, authenticationController.login);
router.post('/validatetoken', userAuthorizationAPI);

module.exports = router;