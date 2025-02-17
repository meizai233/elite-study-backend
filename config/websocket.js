const { Server } = require("socket.io");
const Redis = require("ioredis");
const fs = require("fs");
const https = require("https");
const { duration_record } = require("../service/UserService.js");

const userSessions = new Map();

const websocket = (server) => {
  // 根据环境配置 Socket.IO 选项
  const socketOptions = {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
    // 明确的传输配置
    transports: ["websocket", "polling"],
    pingTimeout: 60000,
    pingInterval: 25000,
    allowEIO3: true,
  };

  // 实例化 socket
  const io = new Server(server, socketOptions);
  // websocket 建立连接
  io.on("connection", (socket) => {
    // 监听bulletChat事件
    socket.on("bulletChat", (info) => {
      io.emit("message", info);
    });

    // 处理心跳
    socket.on("heartbeat", async (data) => {
      // videoId 不对
      userSessions.set(socket.id, {
        lastHeartbeat: Date.now(),
        productId: data.productId,
        duration: data.duration,
      });

      try {
        // 更新学习进度
        await duration_record({
          productId: data.productId, // 视频ID对应 productId
          episodeId: data.episodeId, // 需要在前端心跳数据中添加 episodeId
          duration: data.duration, // 使用当前播放时间作为学习时长
          token: socket.handshake.auth.token?.split(" ")[1], // 从 socket 认证信息中获取 token
        });
      } catch (error) {
        console.error("更新学习进度失败:", error);
      }
    });
  });

  return io;
};

module.exports = websocket;
