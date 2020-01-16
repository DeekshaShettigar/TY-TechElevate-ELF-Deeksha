const express = require('express');
const router = express.Router();
const billableEmployeesController = require('../controllers/billableEmployees');


//Posting billableEmployees details
router.post('/postBillableEmployeesDetails', billableEmployeesController.postBillableEmployeesDetails);

//Getting billableEmployees details 
router.get('/getBillableEmployeesDetails', billableEmployeesController.getBillableEmployeesDetails);

//Updating billableEmployees details
router.post('/updateBillableEmployeesDetails/:_id', billableEmployeesController.updateBillableEmployeesDetails);

//Deleting billableEmployees details
router.delete('/deleteBillableEmployeesDetails/:id', billableEmployeesController.deleteBillableEmployeesDetails);






module.exports = router;