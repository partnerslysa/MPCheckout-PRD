const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    pass: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('user', userSchema);