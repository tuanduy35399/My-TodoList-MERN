import { useState, useEffect } from 'react'
import axios from "axios";
import { Toaster, toast } from "sonner";
import "./App.css";
import Button from "./Component/Button/Button";
import Task from "./Component/Task/Task";

function App() {
  // let taskList=JSON.parse(localStorage.getItem())
  const [input, setInput]=useState('');
  const [task, setTask] = useState([]);
  const fetchTask = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/");
      setTask(res.data.data);
      // toast.success(res.data.message);
    }
    catch (error) {
      if (error.response) { //error.response do thư viện axios tạo ra
        toast.error(error.response.data.message);
      }
      else {
        toast.error("Lỗi đường truyền");
      }
    }
  }
useEffect(() => {
  fetchTask();
}, []);

  const AddTodo = async () => {
    try {
      if (input.trim() === "") return; //chặn khoảng trắng và rỗng
      const reNewTask = await axios.post("http://localhost:5001/api/", {
        content: input,
      });
      // setTask([reNewTask.data.data, ...task]); sai dòng này, làm nhân đôi id
      setTask((prev) => [reNewTask.data.data, ...prev]);
      setInput("");
      toast.success(reNewTask.data.message);
    } catch (error) {
      if (error.response) {
        //error.response do thư viện axios tạo ra
        toast.error(error.response.data.message);
      } else {
        toast.error("Lỗi đường truyền");
      }
    }
}

  const UpdateToDo = async (id, newContent) => {
    try {
      if (newContent.trim() === "") return; //chặn khoảng trắng và rỗng
      const reNewTask = await axios.put(`http://localhost:5001/api/${id}`, {
        content: newContent,
      });
      // setTask([reNewTask.data.data, ...task]); sai dòng này, làm nhân đôi id
      setTask((prev) => prev.map((task) =>
        task._id===id ? {...task, content: reNewTask.data.data.content} : task
    ))
      toast.success(reNewTask.data.message);
    } catch (error) {
      if (error.response) {
        //error.response do thư viện axios tạo ra
        toast.error(error.response.data.message);
      } else {
        toast.error("Lỗi đường truyền");
      }
    }
}
  const DelTodo = async (id) => {
    try {
      console.log(id);
      const reNewTask = await axios.delete(`http://localhost:5001/api/${id}`);
      // setTask([reNewTask.data.data, ...task]); sai dòng này, làm nhân đôi id
      setTask((prev) => prev.filter((task) => task._id !== id));
      toast.success(reNewTask.data.message);
    } catch (error) {
      if (error.response) {
        //error.response do thư viện axios tạo ra
        toast.error(error.response.data.message);
      } else {
        toast.error("Lỗi đường truyền");
      }
    }
    
  };
  return (
    <>
      <Toaster />
      <div className="layout TodoList">
        <h1>Todo List</h1>
        <div className="layout input">
          <textarea
            placeholder="Nhập công việc"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
          <Button handle={AddTodo}>+</Button>
        </div>
        <div className="Todo">
          {task.map((value) => (
            <Task
              key={value._id}
              onDelete={() => DelTodo(value._id)}
              onUpdate={(newText) => UpdateToDo(value._id, newText)}
            >
              {value.content}
            </Task>
          ))}
        </div>
      </div>
    </>
  );
}

export default App
