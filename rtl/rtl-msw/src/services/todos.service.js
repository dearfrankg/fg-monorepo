// import axios from "axios";

// axios.defaults.withCredentials = true;

export const getTodos = () =>
  fetch("http://localhost:4000/todos", { method: "get" })
    .then(async (res) => {
      if (res.status === 500) throw await res.json();
      return res;
    })
    .then((res) => res.json());
