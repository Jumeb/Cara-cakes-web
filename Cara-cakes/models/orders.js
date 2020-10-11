const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {
        name: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    pastries: [{
        pastry: {
            type: Object,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    event: {
        name: {
            type: String,
            required: true
        },
        purpose: {
            type: String,
            required: true
        },
        eventId: {
            type: Schema.Types.ObjectId,
            ref: 'Event',
            required: true
        },
        location: {
            type: String,
            required: true
        },
        day: {
            type: String,
            required: true
        },
        month: {
            type: String,
            requred: true
        },
        year: {
            type: String,
            required: true
        },
        min: {
            type: String,
            required: true
        },
        hour: {
            type: String,
            required: true
        },
        per: {
            type: String,
            required: true
        },
        totalAmount: {
            type: Number,
            required: true
        }
    },
    admin: {
        adminId: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        },
        adminCompany: {
            type: String
        }
    },
});

module.exports = mongoose.model('Order', orderSchema);