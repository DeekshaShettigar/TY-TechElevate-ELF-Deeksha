const Billable = require('../models/billableEmployees');

//Get billable employees data on dashboard based on Stack
exports.getBillableEmployeesDetailsCount = (req, res, next) => {
    Billable.aggregate([{
        $group: {
            _id: { stack: "$stack" },
            count: { $sum: 1 }
        }
    },
    { $match: { count: { "$gte": 1 } } }
    ]).then(billableEmployeesDetailsCount => {
        res.json(billableEmployeesDetailsCount);
    }).catch(err => {
        console.log(err);
    })
}

//Get the count of employees deployed to client
exports.getBillableToClientsCount = (req, res, next) => {
    Billable.aggregate([{
        $group: {
            _id: { clientId: "$clientId" },
            count: { $sum: 1 }
        }
    },
    { $match: { count: { "$gte": 1 } } }
    ]).then(billableEmployeesCount => {
        res.json(billableEmployeesCount);
    }).catch(err => {
        console.log(err);
    })
}

//Get billable employees data on dashboard based on year of experience
exports.getBillableExperienceCount = (req, res, next) => {
    Billable.aggregate([{        
        $group: {
            _id: { yearOfExperience: "$yearOfExperience" },
            count: { $sum: 1 }
        }
    },
    { $match: { count: { "$gte": 1 } } }
    ]).then(billableEmployeesExpDetailsCount => {
        res.json(billableEmployeesExpDetailsCount);
    }).catch(err => {
        console.log(err);
    })
}

//Get billable employees data to particular client on table
exports.getBillableToClientData = (req, res, next) => {
    let clientId = req.params.clientId;
    Billable.find({ clientId: clientId }).then(billableData => {
        console.log(billableData);
        res.json(billableData);
    }).catch(err => {
        console.log(err);
    })
}

//Get Stack Details of Billable employees based on Client on dashboard
exports.getBillableDeployedToClients = (req, res, next) => {
    let clientName = req.params.clientName;
    console.log(clientName)
    Billable.aggregate([
        { $match: { clientName: clientName } },
        {
            $group: {
                _id: {
                    stack: "$stack",
                },
                count: { "$sum": 1 }
            }
        }
    ]).then(billableDetails => {
        console.log(billableDetails);
        res.json(billableDetails);
    }).catch(err => {
        console.log(err);
    })
}

//Get Experience Details of Billable employees based on Client on dashboard
exports.getBillableEmpExperience = (req, res, next) => {
    let clientId = req.params.clientId;
    console.log(clientId);
    Billable.aggregate([
        { $match: { clientId: clientId } },
        {
            $project: {
                dateOfDeployment: 1,
                lessThan0Year: {
                    $cond: [{ $eq: ["$yearOfExperience", 0] }, 1, 0]
                },
                greaterThan0Year: {
                    $cond: [{ $gt: ["$yearOfExperience", 0] }, 1, 0]
                }
            }
        },
        {
            $group: {
                _id: { $year: "$dateOfDeployment" },
                countFresher: { $sum: "$lessThan0Year" },
                countExp: { $sum: "$greaterThan0Year" }
            }
        }
    ]).then(billableExpDetails => {
        console.log(billableExpDetails);
        res.json(billableExpDetails);
    }).catch(err => {
        console.log(err);
    })
}

//Get Overall Year of Experience Details on Dashboard
exports.getBillableEmployeeExp = (req, res, next) => {
    Billable.aggregate([
        {
            $project: {
                dateOfDeployment: 1,
                lessThan0Year: {
                    $cond: [{ $eq: ["$yearOfExperience", 0] }, 1, 0]
                },
                greaterThan0Year: {
                    $cond: [{ $gt: ["$yearOfExperience", 0] }, 1, 0]
                }
            }
        },
        {
            $group: {
                _id: { $year: "$dateOfDeployment" },
                countFresher: { $sum: "$lessThan0Year" },
                countExp: { $sum: "$greaterThan0Year" }
            },
        }
    ]).then(billableExpDetails => {
        console.log(billableExpDetails);
        res.json(billableExpDetails);
    }).catch(err => {
        console.log(err);
    })
}

// exports.getBillableEmpDataBasedOnStack=(req,res,next)=>{
//     let stack=req.params.stack;
//     Billable.find({stack:stack}).then(billableDetails=>{
//         console.log(billableDetails);
//         res.json(billableDetails);
//     }).catch(err=>{
//         console.log(err);
//     })
// }

