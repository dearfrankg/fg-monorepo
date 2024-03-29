import React, { useEffect, useState } from "react";
import { getTodos } from "./services/todos.service";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    getTodos()
      .then((todos) => {
        setTodos(todos);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <div className="App">
      {error && <h1>{error}</h1>}
      <ul>
        {todos.map((todo, i) => (
          <li key={i}>{todo.body}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
