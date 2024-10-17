const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeLoggedSchema = new Schema({
    sprintId: {
        type: Schema.Types.ObjectId,
        ref: 'Sprint',
        required: true
    },
    username: {
        type: String,
        required: true
    },
    time: {
        type: String, // Storing time as a string (e.g., "02:05:30")
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
}, {
    timestamps: true
});

const TimeLogged = mongoose.model('TimeLogged', timeLoggedSchema);
module.exports = TimeLogged;
