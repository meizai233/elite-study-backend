const { Server } = require("socket.io");

const websocket = (server) => {
  // 实例化socket
  const io = new Server(server, { cors: { origin: "*" } });
  // websocket 建立连接
  io.on("connection", (socket) => {
    console.log("有客户端链接进来了");
    // 监听bulletChat事件
    socket.on("bulletChat", (info) => {
      io.emit("message", info);
    });
  });
};
module.exports = websocket;
