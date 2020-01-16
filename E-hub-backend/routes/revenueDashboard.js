const express = require('express');
const router = express.Router();
const revenueDashboardController = require('../controllers/revenueDashboard');



router.get('/getYearlyRevenueInfo',revenueDashboardController.getYearlyRevenueInfo);












module.exports=router;