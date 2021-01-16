import { useState } from "react";
import "./App.css";
import { RegisterUserModal } from "./components/register-user-modal";
import { TodoList } from "./components/todo-list";

function App() {
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  return (
    <div className="App">
      <button onClick={() => setOpenRegister(true)}>회원가입</button>
      <button onClick={() => setOpenLogin(true)}>로그인</button>
      <RegisterUserModal
        open={openRegister}
        onClose={() => setOpenRegister(false)}
      />
      <TodoList />
    </div>
  );
}

export default App;
