import { useEffect, useState } from "react";
import apiClient from "./api-client";
import "./App.css";
import { TodoItem } from "./components/todo-item";
import { useApi } from "./hooks";

function App() {
  const [value, setValue] = useState("");
  const [getTodosApi, getTodosData, getTodosLoading] = useApi(
    apiClient.getTodos
  );
  const [addTodoApi, , addTodoLoading] = useApi(apiClient.addTodo);
  const [editTodoApi, , editTodoLoading] = useApi(apiClient.editTodo);
  const [deleteTodoApi, , deleteTodoLoading] = useApi(apiClient.deleteTodo);

  const isLoading =
    getTodosLoading || addTodoLoading || editTodoLoading || deleteTodoLoading;

  useEffect(() => {
    getTodosApi();
  }, [getTodosApi]);

  const addTodo = async (inputData) => {
    if (!inputData) {
      alert("값을 입력해주세요");
      return;
    }
    await addTodoApi(inputData);
    await getTodosApi();
    setValue("");
  };

  const editTodo = async (todoId, args) => {
    await editTodoApi(todoId, args);
    await getTodosApi();
  };

  const deleteTodo = async (todoId) => {
    await deleteTodoApi(todoId);
    await getTodosApi();
  };

  return (
    <div className="App">
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={() => addTodo(value)} disabled={isLoading}>
        추가
      </button>

      <ul className="list-group">
        {(getTodosData?.todos || []).map((todo, i) => (
          <li key={todo.id} className="list-group-item">
            <TodoItem
              onUp={
                i !== 0 && (() => editTodo(todo.id, { order: todo.order + 1 }))
              }
              onDown={
                i !== getTodosData?.todos.length - 1 &&
                (() => editTodo(todo.id, { order: todo.order - 1 }))
              }
              onDelete={() => deleteTodo(todo.id)}
              disabled={isLoading}
              done={Boolean(todo.doneAt)}
              onChange={(args) => editTodo(todo.id, args)}
            >
              {todo.value}
            </TodoItem>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
