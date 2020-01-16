const Package = require('../models/packageBillable');


exports.getYearlyRevenueInfo=(req,res,next)=>{
    Package.aggregate([
        {
            $project: {
                dateOfDeployment: 1,
                Profit: {
                    $subtract: [ "$rateCardByClient","$rateCardByTY" ]
                }
            }
        },
        {
            $group: {
                _id: { $year: "$dateOfDeployment" },
                countProfit: { $sum: "$Profit" }
            },
        }
    ]).then(billableRevenueDetails => {
        console.log(billableRevenueDetails);
        res.json(billableRevenueDetails);
    }).catch(err => {
        console.log(err);
    })

}