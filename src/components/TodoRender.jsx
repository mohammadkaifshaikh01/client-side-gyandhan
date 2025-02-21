import React, { useEffect, useState } from "react";
import axios from "axios";

const TodoRender = () => {
  const [todos, setTodos] = useState([]);
  const [updateTodo, setupdateTodo] = useState(null);
  const [sortii, setsortii] = useState("asc");
  const [updating, setupdating] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Not Started");
  const [priority, setPriority] = useState("Low");

  const handleForm = async (e) => {
    e.preventDefault();
    const create = { title, description, status, priority };

    try {
      await axios.post("https://gyandhan-assignment.onrender.com/create", create);
      fetchData();
      alert("Todo Added");
    } catch (error) {
      console.log(error);
    }

    // Reset form
    setTitle("");
    setDescription("");
    setStatus("Not Started");
    setPriority("Low");
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("https://gyandhan-assignment.onrender.com/");
      setTodos(response.data.task);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleEdit = (todo) => {
    setupdateTodo(todo._id);
    setupdating({
      title: todo.title,
      description: todo.description,
      status: todo.status,
      priority: todo.priority,
    });
  };

  const handleChange = (e) => {
    setupdating({ ...updating, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.patch(`https://gyandhan-assignment.onrender.com/update/${updateTodo}`, updating);
      setupdateTodo(null);
      fetchData();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`https://gyandhan-assignment.onrender.com/delete/${_id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Sorting todos by priority
  const priorityCheck = { High: 3, Medium: 2, Low: 1 };
  const sortedTodos = [...todos].sort((a, b) => {
    return sortii === "asc"
      ? priorityCheck[a.priority] - priorityCheck[b.priority]
      : priorityCheck[b.priority] - priorityCheck[a.priority];
  });

  return (
    <>
      <div className="container">
        <h2>Todo List</h2>
        <form onSubmit={handleForm}>
          <input type="text" value={title} placeholder="Enter Your Title" onChange={(e) => setTitle(e.target.value)} />
          <textarea value={description} placeholder="Enter Your Description" onChange={(e) => setDescription(e.target.value)} />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>

      <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-blue-600 text-center mb-6">Your Tasks</h3>

        <button
          onClick={() => setsortii(sortii === "asc" ? "desc" : "asc")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Sort by Priority ({sortii === "asc" ? "Low to High" : "High to Low"})
        </button>

        <div className="grid gap-6">
          {sortedTodos.map((todo) => (
            <div
              key={todo._id}
              className="bg-white p-5 rounded-lg shadow-md border-l-8 transition-transform transform"
              style={{ borderLeftColor: todo.priority === "High" ? "red" : todo.priority === "Medium" ? "orange" : "green" }}
            >
              {updateTodo === todo._id ? (
                <div className="space-y-3">
                  <input type="text" name="title" value={updating.title} onChange={handleChange} className="w-full p-3 border rounded" />
                  <textarea name="description" value={updating.description} onChange={handleChange} className="w-full p-3 border rounded" />
                  <select name="status" value={updating.status} onChange={handleChange} className="w-full p-3 border rounded">
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <select name="priority" value={updating.priority} onChange={handleChange} className="w-full p-3 border rounded">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                  <div className="flex gap-3">
                    <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
                    <button onClick={() => setupdateTodo(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                  </div>
                </div>
              ) : (
                <div>
                  <h4 className="text-xl font-bold">{todo.title}</h4>
                  <p>{todo.description}</p>
                  <div className="mt-2 flex justify-between">
                    <span className={`px-3 py-1 rounded-full ${todo.status === "Completed" ? "bg-green-100" : "bg-yellow-100"}`}>
                      {todo.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full ${todo.priority === "High" ? "bg-red-100" : todo.priority === "Medium" ? "bg-orange-100" : "bg-green-100"}`}>
                      {todo.priority} Priority
                    </span>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <button onClick={() => handleEdit(todo)} className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
                    <button onClick={() => handleDelete(todo._id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TodoRender;
