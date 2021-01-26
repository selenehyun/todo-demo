import { createContext, useState } from "react";
import socketio from "socket.io-client";
import { API_HOST } from "../libs/api-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket] = useState(socketio.connect(API_HOST));

  if (!socket) {
    return null;
  }

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
