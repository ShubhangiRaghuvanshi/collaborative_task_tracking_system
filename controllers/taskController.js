const mongoose = require('mongoose');
const Task = require('../models/Task'); 
const {generateTaskDescription}=require('../utils/generateTaskDescription')

const createTask = async (req, res) => {
    const {title,dueDate } = req.body;
    if (!title ||  !dueDate) {
        return res.status(400).json({ message: 'Title and due date are required' });
    }
    if (title.length < 1 || title.length > 100) {
        return res.status(400).json({ message: 'Title must be between 1 and 100 characters' });
    }

    const userId = req.user.id;

    try {
      

     
           
       let   finalDescription = await generateTaskDescription(`In one short sentence, describe the task: "${title}"`);
        console.log('Generated Description:', finalDescription);
       finalDescription = finalDescription.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(); 
       
       
       if(finalDescription.length>500)
        {
finalDescription=finalDescription.slice(0,300).trim()+'...';
        }

        const task = new Task({
            title,
            description: finalDescription, 
            dueDate,
            status: 'pending',
            user: userId 
        });

        await task.save();
        res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const fetchTasks=async (req, res) => {
   
    try {
  const {status,search,page=1,limit=5} = req.query;
   const userId = req.user.id; 
   let query={};
   query.assignedTo = new mongoose.Types.ObjectId(userId);
    if(status) query.status=status;
    if(search)
    {
        const regEx=new RegExp(search,'i');
        query.$or=[{title:regEx},{description:regEx}];
    }
        const skip=(page-1)*limit;
        const tasks=await Task.find(query).skip(skip).limit(limit).sort({dueDate:1});
        const totalTasks = await Task.countDocuments(query);
        res.status(200).json({
            tasks,
            page: Number(page),
            totalPages: Math.ceil(totalTasks / limit),
            totalTasks
          });


        
    }
    catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


const markTaskAsCompleted = async (req, res) => {
    const {id}=req.params;
    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        if(task.assignedTo.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You do not have permission to update this task' });
        }
        task.status = 'completed';
        await task.save();
        const io=req.app.get('io');
        io.to(task.assignedTo).emit('taskCompleted', { message: 'Task marked as completed', taskId: id });
        res.status(200).json({ message: 'Task marked as completed', task });
    }
    catch (error) {
        console.error('Error marking task as completed:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


const assignTaskToUser = async (req, res) => {
    const {taskid}=req.params;
    const {userId}=req.body;
   try{

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid User ID' });
      }
     const io= req.app.get('io');
     io.to(userId).emit('newTaskAssigned', { message: 'You have been assigned a new task',taskId: taskid });    

    const task = await Task.findById((taskid));
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    task.assignedTo = userId;
    await task.save();
    res.status(200).json({ message: 'Task assigned to user', task });    
   } 
   catch (error) {
        console.error('Error assigning task to user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const addCommentToTask = async (req, res) => {
    const { taskId } = req.params;
    const { comment } = req.body;
  
    try {
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      task.comments.push({
        user: req.user.id,
        comment,
        createdAt: new Date()
      });
  
      await task.save();
      const io = req.app.get('io');
      io.to(task.assignedTo).emit('newComment', { message: ' A New comment has been  added to the task', taskId });
      res.status(200).json({ message: 'Comment added to task', task });
    } catch (error) {
      console.error('Error adding comment to task:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };



module.exports = {
    createTask,
    fetchTasks,
    markTaskAsCompleted,
    assignTaskToUser,
    addCommentToTask
};
