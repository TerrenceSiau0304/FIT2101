const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sprintSchema = new Schema({
    sprintName: {
        type: String,
        required: true,
        trim: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    sprintStatus: {
        type: String,
        required: true, 
        enum: ['Not started', 'In progress', 'Completed'], 
        default: 'Not started'
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }]
}, {
    timestamps: true,
});

const Sprint = mongoose.model('Sprint', sprintSchema);
module.exports = Sprint;