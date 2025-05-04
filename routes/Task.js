const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const { createTask, fetchTasks,markTaskAsCompleted ,assignTaskToUser,addCommentToTask} = require('../controllers/taskController');

router.post('/', authMiddleware, createTask); 
router.get('/', authMiddleware, fetchTasks);
router.put('/:id', authMiddleware,markTaskAsCompleted);
router.put('/:taskid/assign',authMiddleware,assignTaskToUser);
router.post('/:taskId', authMiddleware, addCommentToTask);
module.exports = router;

