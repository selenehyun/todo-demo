import { useContext, useState } from "react";
import "./App.css";
import { EchoStack } from "./components/echo-stack";
import { LoginModal } from "./components/login-modal";
import { RealtimeCounter } from "./components/realtime-counter";
import { RegisterUserModal } from "./components/register-user-modal";
import { SocketProvider } from "./components/socket-provider";
import { TodoList } from "./components/todo-list";
import { UserProvider, UserContext } from "./components/user-provider";

const TodoApp = () => {
  const user = useContext(UserContext);
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <>
      {user.getUser() && (
        <>
          <button
            onClick={() => {
              localStorage.setItem("token", null);
              window.location.reload();
            }}
          >
            로그아웃
          </button>
          <hr />
          <TodoList />
        </>
      )}
      {!user.getUser() && (
        <>
          <button onClick={() => setOpenRegister(true)}>회원가입</button>
          <button onClick={() => setOpenLogin(true)}>로그인</button>
          <RegisterUserModal
            open={openRegister}
            onClose={() => setOpenRegister(false)}
          />
          <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />
          <div>사용하려면 로그인 먼저 해주세요.</div>
        </>
      )}
    </>
  );
};

function App() {
  return (
    <div className="App">
      <SocketProvider>
        <UserProvider>
          <RealtimeCounter />
          <TodoApp />
          <EchoStack />
        </UserProvider>
      </SocketProvider>
    </div>
  );
}

export default App;
