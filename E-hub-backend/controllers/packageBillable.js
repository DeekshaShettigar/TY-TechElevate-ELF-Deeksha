const Billable= require('../models/billableEmployees');
const Package = require('../models/packageBillable');


exports.postBillablePackage = (req, res, next) => {
    let employeeName=req.body.employeeName;
    Billable.find({employeeName:employeeName}).then(billableDetails=>{
        let  dateOfDeployment = billableDetails[0]. dateOfDeployment;
        new Package({
            clientName: req.body.clientName,
            employeeName: req.body.employeeName,
            dateOfPaymentByTY: req.body.dateOfPaymentByTY,
            dateOfPaymentByClient: req.body.dateOfPaymentByClient,
            rateCardByTY: req.body.rateCardByTY,
            rateCardByClient: req.body.rateCardByClient,
            dateOfDeployment:dateOfDeployment
        }).save().then(packages => {
            console.log(packages);
            res.json(packages);
        })
    }) .catch(err => {
        console.log(err);
    })
}

exports.getBillablePackage = (req, res, next) => {
    Package.find().then(packages => {
        res.json(packages);
    }).catch(err => {
        console.log(err);
    })
}