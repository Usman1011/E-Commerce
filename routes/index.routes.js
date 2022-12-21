const express = require('express');
const router = express.Router();
const {HomeController} = require('../controllers/home.controller');

const apiV1 = "/api";
const homeController = new HomeController();

router.get(`${apiV1}/`, homeController.getAllProducts);

module.exports = router;