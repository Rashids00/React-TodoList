const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: String,
    description: String,
    isCompleted: Boolean
});

module.exports = mongoose.model('Task', taskSchema);