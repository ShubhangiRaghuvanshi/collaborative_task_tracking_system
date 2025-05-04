const mongoose=require('mongoose');
const { assignTaskToUser } = require('../controllers/taskController');
const taskSchema=new mongoose.Schema({
    title:{
        type:String,    
        required:true,
        trim:true,
        minlength:1,
        maxlength:100,
        unique:true
    },
    description:{
        type:String,
        required:true,
        trim:true,
        minlength:1,
        maxlength:500
    },
    dueDate:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:['pending','in-progress','completed'],
        default:'pending'
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      comments: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
          },
          comment: {
            type: String,
            required: true
          },
          createdAt: {
            type: Date,
            default: Date.now
          }
        }
      ],
      attachments: [
        {
            fileName: String,
            fileUrl: String,
            uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            createdAt: { type: Date, default: Date.now },
        }]
});
module.exports=mongoose.model('Task',taskSchema);
    
