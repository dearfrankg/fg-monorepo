import React, { useEffect, useState } from "react";
import { getTodos } from "./services/todos.service";

function MswOnline() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    getTodos()
      .then((res) => {
        const { data: todos } = res;
        setTodos(todos);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }, []);

  return (
    <div>
      {error && <h1>{error}</h1>}
      <ul>
        {todos.map((todo, i) => (
          <li key={i}>{todo.body}</li>
        ))}
      </ul>
    </div>
  );
}

export default MswOnline;
