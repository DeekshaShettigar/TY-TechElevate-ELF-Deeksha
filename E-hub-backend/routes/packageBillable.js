const express = require('express');
const router = express.Router();
const billablePackageController = require('../controllers/packageBillable');

router.post('/postBillablePackage', billablePackageController.postBillablePackage);
router.get('/getBillablePackage', billablePackageController.getBillablePackage);





module.exports = router;