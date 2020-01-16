const express = require('express');
const router = express.Router();
const billableDashboardController = require('../controllers/billabledashboard');


//Getting billableEmployees details count
router.get('/getBillableEmployeesDetailsCount', billableDashboardController.getBillableEmployeesDetailsCount);

router.get('/getBillableExperienceCount', billableDashboardController.getBillableExperienceCount);

router.get('/getBillEmployeesBasedOnClient', billableDashboardController.getBillableToClientsCount);

router.get('/getBillableToClientData/:clientId', billableDashboardController.getBillableToClientData);

router.get('/getBillableDeployToClient/:clientName', billableDashboardController.getBillableDeployedToClients);

router.get('/getBillableEmpExperience/:clientId', billableDashboardController.getBillableEmpExperience);

router.get('/getBillableEmployeeExp', billableDashboardController.getBillableEmployeeExp);

// router.get('/getYearlyRevenueInfo',billableDashboardController.getYearlyRevenueInfo);

// router.get('/getBillableEmpDataBasedOnStack/:stack',billableDashboardController.getBillableEmpDataBasedOnStack);



module.exports = router;