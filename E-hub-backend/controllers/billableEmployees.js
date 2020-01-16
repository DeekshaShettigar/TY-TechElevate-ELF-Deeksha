const Client = require('../models/clientDetails');
const Billable = require('../models/billableEmployees');


exports.postBillableEmployeesDetails = (req, res, next) => {
    let clientName = req.body.clientName
    Client.find({ "clientName": clientName }).then(client => {
        let clientId = client[0].clientId;
        if (client.length > 0) {
            new Billable({
                clientId: clientId,
                clientName: req.body.clientName,
                employeeName: req.body.employeeName,
                dateOfDeployment: req.body.dateOfDeployment,
                contractEndDate: req.body.contractEndDate,
                rateCard: req.body.rateCard,
                stack: req.body.stack,
                yearOfExperience: req.body.yearOfExperience
            }).save().then(billables => {
                console.log(billables);
                res.json(billables);
                let xy = new Billable({
                    ...billables._doc
                });
                const filter = { _id: billables._doc._id };
                const update = { employeeId: 'TY_' + '_' + billables._doc._id };

                Billable.findOneAndUpdate(filter, update).then((billables) => {
                    console.log('Updated Data', billables);

                });
            })
        } else {
            res.json({ msg: "Client does not exist" });
        }
    }).catch(err => {
        console.log(err);
    });
}



exports.getBillableEmployeesDetails = (req, res, next) => {
    Billable.find().then(billableEmployeesDetails => {
         console.log(billableEmployeesDetails);
        res.json(billableEmployeesDetails);
    }).catch(err => {
        console.log(err);
    })
}


exports.updateBillableEmployeesDetails = (req, res, next) => {
    let employeeId = req.params._id;
    billableEmployeesDetails.findById(employeeId).then(billableEmployeesDetails => {
        billableEmployeesDetails.dateOfDeployment = req.body.dateOfDeployment;
        billableEmployeesDetails.contractEndDate = req.body.contractEndDate;
        billableEmployeesDetails.rateCard = req.body.rateCard;
        billableEmployeesDetails.stack = req.body.stack;
        billableEmployeesDetails.yearOfExperience = req.body.yearOfExperience;
        billableEmployeesDetails.save();
        res.json(billableEmployeesDetails);
    }).catch(err => {
        console.log(err);
    })
}

exports.deleteBillableEmployeesDetails = (req, res, next) => {
    let id = req.params.id;
    billableEmployeesDetails.findByIdAndRemove(id).then(billableEmployeesDetails => {
        console.log(billableEmployeesDetails);
        res.json(billableEmployeesDetails);
    }).catch(err => {
        console.log(err);
    })
}


