import { createContext, useState } from "react";
import socketio from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket] = useState(socketio.connect("http://localhost:8080"));

  if (!socket) {
    return null;
  }

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
