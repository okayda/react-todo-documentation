import { React, useEffect, useState } from "react";

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) return JSON.parse(savedTodos);

    return [];
  });

  const [todo, setTodo] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = function (e) {
    setTodo(e.target.value);
  };

  const handleEditInputChange = function (e) {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log({ ...currentTodo, text: e.target.value });
  };

  const handleEditClick = function (todo) {
    setIsEditing(true);

    setCurrentTodo({ ...todo });
  };

  const handleUpdateTodo = function (id, updatedTodo) {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });

    setIsEditing(false);

    setTodos(updatedItem);
  };

  const handleEditFormSubmit = function (e) {
    e.preventDefault();

    handleUpdateTodo(currentTodo.id, currentTodo);
  };

  const handleFormSubmit = function (e) {
    e.preventDefault();

    if (todo !== "") {
      setTodos([...todos, { id: todos.length + 1, text: todo.trim() }]);
    }

    setTodo("");
  };

  const handleDeleteClick = function (id) {
    const removeItem = todos.filter((todo) => todo.id !== id);
    setTodos(removeItem);
  };

  return (
    <div className="App">
      {isEditing ? (
        <form onSubmit={handleEditFormSubmit}>
          <h2>Edit Todo</h2>
          <label htmlFor="editTodo">Edit todo: </label>
          <input
            name="editTodo"
            type="text"
            placeholder="Edit todo"
            value={currentTodo.text}
            onChange={handleEditInputChange}
          />

          <button type="submit">Update</button>

          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <input
            name="todo"
            type="text"
            placeholder="Create a new todo"
            value={todo}
            onChange={handleInputChange}
          />

          <button type="submit">Add</button>
        </form>
      )}
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleEditClick(todo)}>Edit</button>
            <button onClick={() => handleDeleteClick(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
