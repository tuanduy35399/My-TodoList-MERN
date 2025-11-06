import mongoose from "mongoose"; 

export const taskSchema = mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true,
    },
    // status: {
    //     type: String,
    //     enum: ["active", "complete"];
    //     default:"active"
    // }
},
    {timestamps: true}
)
const Task = mongoose.model("Task", taskSchema);
export default Task;