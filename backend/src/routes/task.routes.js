import express from "express";
import { createTask, deleteTask, getAllTask, updateTask } from "../controllers/task.controllers.js";
const route = express.Router();


//Lấy danh sách các task
route.get("/", getAllTask);

//Tạo task
route.post("/", createTask);
//Cập nhật task
route.put("/:id", updateTask);
//Xóa task
route.delete("/:id", deleteTask);

export default route;

