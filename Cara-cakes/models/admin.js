const mongoose =  require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    type: {
        type: String,
    },
    about: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Admin', adminSchema)