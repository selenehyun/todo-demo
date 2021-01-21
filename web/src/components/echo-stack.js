import { useContext, useEffect, useState } from "react";
import { SocketContext } from "./socket-provider";

export const EchoStack = () => {
  const socket = useContext(SocketContext);
  const [echo, setEcho] = useState();

  useEffect(() => {
    socket.on("ECHO", (message) => {
      setEcho(message);
    });
  }, [socket, setEcho]);

  return (
    <div>
      <div>
        <button onClick={() => socket.emit("ECHO")}>Echo!</button>
      </div>
      <div>{echo}</div>
    </div>
  );
};
