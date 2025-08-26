import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://127.0.0.1:8000/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const fetchTodos = async () => {
    try {
      const res = await axios.get(API_URL);
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  const addTodo = async () => {
    if (newTodo.trim() === "") return;
    try {
      const res = await axios.post(API_URL, { title: newTodo });
      setTodos([...todos, res.data]);
      setNewTodo("");
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`);
      setTodos(todos.map(todo => todo.id === id ? res.data : todo));
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  const clearTodos = async () => {
    try {
      const deletePromises = todos.map(todo => axios.delete(`${API_URL}/${todo.id}`));
      await Promise.all(deletePromises);
      setTodos([]);
    } catch (err) {
      console.error("Error clearing todos:", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="app-container">
      <h1 className="title">✅ Todo App</h1>

      <div className="input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a todo..."
          className="todo-input"
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />
        <button onClick={addTodo} className="add-btn">
          Add
        </button>
      </div>

      <p className="counter">You have {todos.length} task(s)</p>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
          >
            <span>{todo.title}</span>
            <div className="actions">
              <button
                onClick={() => toggleTodo(todo.id)}
                className="done-btn"
              >
                {todo.completed ? "Undo" : "Done"}
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {todos.length > 0 && (
        <div className="clear-container">
          <button onClick={clearTodos} className="clear-btn">
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
