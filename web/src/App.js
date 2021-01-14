import { useEffect, useState } from "react";
import apiClient from "./api-client";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    (async () => {
      setTodos(await apiClient.getTodos());
    })();
  }, []);

  const addTodo = async (inputData) => {
    const todo = await apiClient.addTodo(inputData);
    setTodos([todo, ...todos]);
  };

  return (
    <div className="App">
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={() => addTodo(value)}>추가</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.value}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
