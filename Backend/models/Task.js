const mongoose = require('mongoose'); //Pulls Database link from URL to store Tasks

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: {
      type: String,
      enum: ['To Do', 'In Progress', 'Completed'], //Task status options
      default: 'To Do', // Default task status
    },
    userId: String,
  });

module.exports = mongoose.model('Task', TaskSchema);
