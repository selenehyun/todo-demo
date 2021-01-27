import "./App.css";
import { TodoList } from "./components/todo-list";

const TodoApp = () => {
  return (
    <>
      <TodoList />
    </>
  );
};

function App() {
  return (
    <div className="App">
      <TodoApp />
    </div>
  );
}

export default App;
