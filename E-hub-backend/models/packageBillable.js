const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let billablePackageSchema = new Schema({
    clientName: {
        type: String
    },
    employeeName: {
        type: String
    },
    dateOfPaymentByTY: {
        type: String
    },
    dateOfPaymentByClient: {
        type: String
    },
    rateCardByTY: {
        type: Number
    },
    rateCardByClient: {
        type: Number
    },
    dateOfDeployment: {
        type: Date
    }

})

module.exports = mongoose.model('Package', billablePackageSchema);