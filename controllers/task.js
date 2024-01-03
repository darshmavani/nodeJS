import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask =  async (req,res,next) => {

    try {
        const { title ,description } = req.body;
    
        await Task.create({
            title,
            description,
            user:req.user,
        });
    
        res.status(201).json({
            success:true,
            message:"Task added Successfully",
        });
    } catch (error) {
        next(error);
    }
   
};

export const getMyTask = async (req,res,next) => {

    try {
        
    const userid = req.user._id;


    const tasks = await Task.find({user: userid });

    res.status(300).json({
        success:true,
        tasks,
    });
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (req,res,next) => {

    try {
        const taskId = req.params.id;

        // Retrieve the current task
        const currentTask = await Task.findById(taskId);

        if (!currentTask) return next(new ErrorHandler("Task Not Found",404));

        // Toggle the 'isCompleted' field
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { $set: { isCompleted: !currentTask.isCompleted } },
            { new: true }
        );

        console.log('Updated Task:', updatedTask);

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
        });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }


};

export const deleteTask = async (req,res,next) => {

try {
    const task = await Task.findById(req.params.id);
    
    if(!task)  return next(new ErrorHandler("Invalid Id",404))
    

    await Task.deleteOne();             

    res.status(300).json({
        success:true,
        message:"Task Deleted"
});
} catch (error) {
    next(error);
}
};