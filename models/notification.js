const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    procesado: {
        type: Boolean,
        default: false
    },
    dateUpd: Date
});

module.exports = mongoose.model('notification', notificationSchema);