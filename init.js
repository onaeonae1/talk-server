import dotenv from "dotenv";
import "./db"; //db 불러오기
import "./webSocket/webSocket"; //웹 소켓 불러오기
import app from "./app";
import path from "path";
dotenv.config();

const PORT = process.env.PORT;
const SOCKET_PORT = process.env.SOCKET_PORT;
const handleListening = () => {
  console.log(`API Server : http://localhost:${PORT}`);
  console.log(`Socket Server : http://localhost:${SOCKET_PORT}`);
};
app.listen(PORT, handleListening);
