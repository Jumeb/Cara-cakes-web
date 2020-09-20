const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telNo: {
        type: Number,
        required: true
    },
    password: {
        type: String
    },
    image: {
        type: String
    }


})

module.exports = mongoose.model('User', userSchema)