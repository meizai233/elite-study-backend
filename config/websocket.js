const { Server } = require("socket.io");
const Redis = require("ioredis");
// redis发布的api
const clientPublish = new Redis({ port: 6379, host: "47.121.207.171", password: "Qweasd123" });
// redis订阅api
const clientSubscribe = new Redis({ port: 6379, host: "47.121.207.171", password: "Qweasd123" });

clientSubscribe.subscribe("chat");

const websocket = (server) => {
  // 实例化socket
  const io = new Server(server, { cors: { origin: "*" } });
  // websocket 建立连接
  io.on("connection", (socket) => {
    console.log("有客户端链接进来了");
    // 监听bulletChat事件
    socket.on("bulletChat", (info) => {
      // 每次发弹幕时 发布chat事件给所有subscriber
      clientPublish.publish("chat", info);
    });
  });
  // 订阅者收到消息后 执行websocket的消息推送给客户端
  // 新消息被发布到channel时 message事件被触发
  clientSubscribe.on("message", (channel, message) => {
    io.emit("message", message);
  });
};
module.exports = websocket;
