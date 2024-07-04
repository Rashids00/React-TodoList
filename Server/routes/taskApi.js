const express = require('express');
const router = express.Router();
const {listAllTasks, getATask, deleteTask, handleEditTask, handleAddTask, handleUpdateStatus} = require('../controllers/taskController');

router.post('/tasks', handleAddTask);
router.get('/tasks', listAllTasks);
router.get('/tasks/:id', getATask);
router.put('/tasks/:id', handleUpdateStatus);
router.delete('/tasks/:id', deleteTask);
router.put('/tasks/edit/:id', handleEditTask)

module.exports = router;