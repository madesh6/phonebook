require('dotenv').config()
const mongoose = require('mongoose');
var contactSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        maxlength: 20
    },
    phone:{
        type: [String],
        required: true,
        unique: true,

    },
    email:{
        type: [String],
    },
    dob: String
});

module.exports = mongoose.model('Contact', contactSchema);