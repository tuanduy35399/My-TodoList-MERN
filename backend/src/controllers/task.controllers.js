import Task from "../models/task.model.js"

export const getAllTask = async (req, res) => {

    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        console.log("Get all task successful");
        res.status(200).json({
            success: true,
            message: "Get all task successful",
            data: tasks
        })
    } catch (error) {
        console.error("Error on getAllTask controller function", error.message);
        res.status(500).json({
            success: false,
            message: "Cannot get all task",
            error: error.message
        })
    }

}

export const createTask = async (req, res) => {
    try {
        const { content } = req.body;
        const task = new Task({
            content
        })
        const newTask = await task.save(); 
        console.log("New task was added successfully")
        res.status(201).json({
            success: true,
            message: "New task was added successfully",
            data: newTask
        });
    }
    catch (error) {
        console.error("Error on createTask controller function", error.message);
        res.status(500).json({
            success: false,
            message: "Cannot create task",
            error: error.message
        })
    }
}

export const updateTask = async (req, res) => {
    try {
        const {content} = req.body;
        const update_task = await Task.findByIdAndUpdate(
            req.params.id,
            {
                content
            },
            { new: true },
        )
        if (!updateTask) {
            res.status(404).json(
                {
                    message: "Task not founded"
                }
            )  //Lỗi ko tìm thấy
            console.error("Task not founded");
        }
        console.log("Update task successfuly")
        res.status(200).json({
            success: true,
            message: "Update task successfuly",
            data: update_task
        })
    } catch (error) {
        console.error("Error on updateTask controller function", error.massage);
        res.status(500).json({
            success: false,
            message: "Cannot update task",
            error: error.message
        })
        
    }
}

export const deleteTask = async (req, res) => {
    try {
        const delete_task = await Task.findByIdAndDelete(req.params.id);
        if (!deleteTask) {
            res.status(404).json(
                {
                    message: "Task not founded"
                }
            )  //Lỗi ko tìm thấy
            console.error("Task not founded");
        }
        console.log("Delete task successfuly")
        res.status(200).json({
            success: true,
            message: "Delete task successfuly",
            data: delete_task
        })
    } catch (error) {
        console.error("Error on deleteTask controller function", error.massage);
        res.status(500).json({
            success: false,
            message: "Cannot delete task",
            error: error.message
        })
    }
}
