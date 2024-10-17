const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    actionType: { 
        type: String, 
        required: true, 
        enum: ['CREATE', 'UPDATE', 'DELETE', 'ADDED_TASKS'] 
    },
    resourceType: { 
        type: String, 
        required: true, 
        enum: ['Task', 'Sprint'] 
    },
    resourceId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true 
    },
    resourceName: {
        type: String, 
        required: true 
    },
    timestamp: {
        type: Date, 
        default: Date.now
    }
}, {
    timestamps: true,
});

const History = mongoose.model('History', historySchema);
module.exports = History;
