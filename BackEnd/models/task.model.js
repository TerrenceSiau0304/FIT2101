const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: { type: String, required: true },
    story_point: { type: Number, required: true, min: 1 },
    assignee: { type: String, required: true },
    priority: { 
        type: String, 
        required: true, 
        enum: ['Low', 'Medium', 'High', 'Urgent'], 
        default: 'Low' 
    },
    taskStatus: { 
        type: String, 
        required: true, 
        enum: ['Pending', 'In-progress', 'Completed'], 
        default: 'Pending'
    },
    timeCompleted: {
        type: Date,
    },
    type: { 
        type: String, 
        required: true, 
        enum: ['Bug', 'Task'] 
    },
    description: { type: String, required: true },
    date: { 
        type: Date, 
        required: true, 
        default: Date.now 
    },
    sprint: { 
        type: String, 
        default: null
    },
    tags: {
        type: [String], 
        enum: ['Frontend', 'Backend', 'API', 'Database', 'UI'],
        default: []
    },
    projectStage: {
        type: String,
        enum: ['Planning', 'Development', 'Testing', 'Integration'], 
        default: 'Planning' 
    }
}, {
    timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;


