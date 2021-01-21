const socketIo = require("socket.io");
const http = require("../app");

const io = socketIo(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const authUserBySocketId = new Map();

const emitVisitors = () =>
  io.emit("UPDATE_COUNTER", {
    visitors: authUserBySocketId.size,
    // NOTE: value가 null이 아닌 소켓은 로그인한 사용자가 연결된 소켓인걸로 정해두었다.
    users: [...authUserBySocketId.values()].filter(Boolean).length,
  });

const addVisitor = (id, user) => {
  authUserBySocketId.set(id, user || null);
  emitVisitors();
};

const removeVisitor = (id) => {
  authUserBySocketId.delete(id);
  emitVisitors();
};

/**
 * 사용자가 자신을 제외한 사용자에게 메아리치기 위한 기능
 */
const emitEcho = (id) => {
  const user = authUserBySocketId.get(id);
  const message = user
    ? `${new Date().toString()}: ${user.nickname}님이 당신에게 메아리쳤습니다.`
    : `${new Date().toString()}: 익명의 누군가가 당신에게 메아리쳤습니다.`;

  const sockIds = [...authUserBySocketId.keys()].filter(
    (sockId) => sockId !== id
  );

  for (const sockId of sockIds) {
    io.to(sockId).emit("ECHO", message);
  }
};

io.on("connection", (sock) => {
  addVisitor(sock.id);

  sock.on("disconnect", () => {
    removeVisitor(sock.id);
  });

  sock.on("CLIENT_INIT", ({ user }) => {
    addVisitor(sock.id, user);
  });

  sock.on("ECHO", () => {
    emitEcho(sock.id);
  });
});
