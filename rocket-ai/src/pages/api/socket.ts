import { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const socket = res.socket as any; // 타입 단언을 통해 socket의 타입을 any로 설정합니다.

  if (socket.server.io) {
    console.log("이미 소켓 서버가 실행 중입니다.");
    res.end();
    return;
  }

  const io = new Server(socket.server);
  io.on("connection", (socket) => {
    console.log("새로운 유저가 연결되었습니다.");

    socket.on("message", (msg: string) => {
      io.emit("message", msg);
    });

    socket.on("disconnect", () => {
      console.log("유저가 연결을 끊었습니다.");
    });
  });

  socket.server.io = io;
  res.end();
}
