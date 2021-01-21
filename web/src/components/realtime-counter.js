import { useContext, useEffect, useState } from "react";
import { SocketContext } from "./socket-provider";
import { UserContext } from "./user-provider";

export const RealtimeCounter = () => {
  const user = useContext(UserContext);
  const socket = useContext(SocketContext);
  const [counter, setCounter] = useState({ visitors: 0, users: 0 });

  useEffect(() => {
    socket.emit("CLIENT_INIT", { user: user.getUser() });
    socket.on("UPDATE_COUNTER", ({ visitors, users }) => {
      setCounter({ visitors, users });
    });
  }, [socket, user]);

  return (
    <div>
      현재 {counter.visitors}명의 접속자가 존재하며, {counter.users}명의
      사용자가 서비스를 이용하고 있습니다. 👋
    </div>
  );
};
